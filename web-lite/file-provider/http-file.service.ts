import { Autowired, Injectable } from '@opensumi/di';
import { URI, Uri, AppConfig, Deferred } from '@opensumi/ide-core-browser';

import { ICodeAPIProvider, ICodePlatform, IRepositoryModel, CodePlatform, TreeEntry } from '../code-api/common/types';
import { DEFAULT_URL, parseUri } from '../utils';

import { AbstractHttpFileService } from './browser-fs-provider';

const PathSeparator = '/';
const HEAD = 'HEAD';

export type HttpTreeList = { path: string; content?: string; children: HttpTreeList }[];

// NOTE: 一个内存文件读写的简单实现，集成时可以自行替换
@Injectable()
export class HttpFileService extends AbstractHttpFileService {
  @Autowired(ICodeAPIProvider)
  codeAPI: ICodeAPIProvider;

  @Autowired(AppConfig)
  private appConfig: AppConfig;

  private fileTree: HttpTreeList;

  public fileMap: { [filename: string]: TreeEntry };

  public _repo: IRepositoryModel;

  private _whenReady: Deferred<void> = new Deferred();

  get whenReady() {
    return this._whenReady.promise;
  }

  async initWorkspace(uri: Uri): Promise<{ [filename: string]: TreeEntry }> {
    const map: {
      [filePath: string]: TreeEntry;
    } = {};

    const [, platform, owner, name] = uri.path.split('/');

    this._repo = {
      platform: platform as ICodePlatform,
      owner,
      name,
      commit: '',
    };

    const hash =
      location.hash.startsWith('#') && location.hash.indexOf('github') > -1 ? location.hash.split('#')[1] : DEFAULT_URL;
    const { branch } = parseUri(hash);

    try {
      if (!branch) {
        this._repo.commit = await this.codeAPI.asPlatform(CodePlatform.github).getCommit(this._repo, HEAD);
      } else {
        const branches = await this.codeAPI.asPlatform(CodePlatform.github).getBranches(this._repo);
        const originBranch = branches.find((b) => branch === b.name);
        let originTag;
        // 尝试查找tag
        if (!originBranch) {
          const tags = await this.codeAPI.asPlatform(CodePlatform.github).getTags(this._repo);
          originTag = tags.find((t) => branch === t.name);
        }
        this._repo.commit = originBranch?.commit.id || originTag?.commit.id || '';
      }
    } catch (err) {
      console.error(err);
    }

    // TODO 不使用 recursive 递归接口直接查询
    const tree = await this.codeAPI
      .asPlatform(CodePlatform.github)
      .getTree(this._repo, '', 1)
      .catch((err) => {
        console.error(err);
        return [];
      });

    tree.forEach((item) => {
      map[item.path] = item;
    });
    this.fileMap = map;
    this.fileTree = this.pathToTree(this.fileMap);
    this._whenReady.resolve();
    return this.fileMap;
  }

  private pathToTree(files: { [filename: string]: TreeEntry }) {
    // // https://stackoverflow.com/questions/54424774/how-to-convert-an-array-of-paths-into-tree-object
    const result: HttpTreeList = [];
    // helper 的对象
    const accumulator = { __result__: result };
    const filelist = Object.keys(files).map((path) => ({
      path,
      content: files[path],
    }));
    filelist.forEach((file) => {
      const path = file.path!;
      // 初始的 accumulator 为 level
      path.split(PathSeparator).reduce((acc, cur) => {
        // 每次返回 path 对应的 desc 作为下一个 path 的 parent
        // 不存在 path 对应的 desc 则创建一个新的挂载到 acc 上
        if (!acc[cur]) {
          acc[cur] = { __result__: [] };
          const element = {
            path: cur,
            children: acc[cur].__result__,
          };

          // 说明是文件
          if (path.endsWith(cur)) {
            (element as any).content = file.content;
          }
          acc.__result__.push(element);
        }
        // 返回当前 path 对应的 desc 作为下一次遍历的 parent
        return acc[cur];
      }, accumulator);
    });

    return result;
  }

  async readFile(uri: Uri, encoding?: string): Promise<string> {
    const _uri = new URI(uri);
    const relativePath = URI.file(this.appConfig.workspaceDir).relative(_uri)!.toString();
    if (this.fileMap[relativePath].mode === 'new') {
      return this.fileMap[relativePath].content || '';
    }
    const blob = await this.codeAPI.asPlatform(CodePlatform.github).getBlob(this._repo, this.fileMap[relativePath]);
    return blob.toString();
  }

  async readDir(uri: Uri) {
    const _uri = new URI(uri);
    const treeNode = this.getTargetTreeNode(_uri);
    const relativePath = this.getRelativePath(_uri);
    return (treeNode?.children || []).map((item) => ({
      ...item,
      path: relativePath + PathSeparator + item.path,
    }));
  }

  private getTargetTreeNode(uri: URI) {
    const relativePath = this.getRelativePath(uri);
    if (!relativePath) {
      // 根目录
      return { children: this.fileTree, path: relativePath };
    }
    const paths = relativePath.split(PathSeparator);
    let targetNode: { path: string; content?: string; children: HttpTreeList } | undefined;
    let nodeList = this.fileTree;
    paths.forEach((path) => {
      targetNode = nodeList.find((node) => node.path === path);
      nodeList = targetNode?.children || [];
    });
    return targetNode;
  }

  async updateFile(uri: Uri, content: string, options: { encoding?: string; newUri?: Uri }): Promise<void> {
    const _uri = new URI(uri);
    // TODO: sync update to remote logic
    const relativePath = this.getRelativePath(_uri);
    if (options.newUri) {
      delete this.fileMap[relativePath];
      // TODO: 只更新对应节点，可以有更好的性能
      this.fileTree = this.pathToTree(this.fileMap);
    } else {
      const targetNode = this.getTargetTreeNode(_uri);
      if (!targetNode || targetNode.children.length > 0) {
        throw new Error('无法更新目标文件内容：目标未找到或为目录');
      }
      targetNode.content = content;
    }
  }

  async createFile(uri: Uri, content: string, options: { encoding?: string }) {
    const _uri = new URI(uri);
    const relativePath = URI.file(this.appConfig.workspaceDir).relative(_uri)!.toString();
    // TODO: sync create to remote logic
    // mock file
    if (this.fileMap[relativePath] === undefined) {
      this.fileMap[relativePath] = {
        name: relativePath,
        mode: 'new',
        type: 'blob',
        id: relativePath,
        path: relativePath,
        content: '',
      };
    }
    // TODO: 性能优化
    this.fileTree = this.pathToTree(this.fileMap);
  }

  async deleteFile(uri: Uri, options: { recursive: boolean; moveToTrash?: boolean }) {
    const _uri = new URI(uri);
    const relativePath = URI.file(this.appConfig.workspaceDir).relative(_uri)!.toString();
    // TODO: sync delete to remote logic
    delete this.fileMap[relativePath];
    // TODO: 性能优化
    this.fileTree = this.pathToTree(this.fileMap);
  }

  protected getRelativePath(uri: URI) {
    const path = URI.file(this.appConfig.workspaceDir).relative(uri)!.toString();
    return path;
  }
}

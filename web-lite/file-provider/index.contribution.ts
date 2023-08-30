import { Autowired } from '@opensumi/di';
import {
  Domain,
  URI,
  FsProviderContribution,
  AppConfig,
  Uri,
  StaticResourceContribution,
  StaticResourceService
} from '@opensumi/ide-core-browser';
import { Path } from '@opensumi/ide-utils/lib/path';
import { AbstractHttpFileService } from './browser-fs-provider';
import { IFileServiceClient } from '@opensumi/ide-file-service';
import { FileServiceClient } from '@opensumi/ide-file-service/lib/browser/file-service-client';
import { IWorkspaceService } from '@opensumi/ide-workspace';

import { ExtFsProvider } from './ext-fs-provider';
import { HttpFileService } from './http-file.service';

const EXPRESS_SERVER_PATH = window.location.href;
const EXTENSION_PROVIDER_SCHEME = 'ext';
const HTTPS_PROVIDER_SCHEME = 'https';
const HTTP_PROVIDER_SCHEME = 'http';

// 远程读取文件资源 
@Domain(StaticResourceContribution, FsProviderContribution)
export class FileProviderContribution implements StaticResourceContribution, FsProviderContribution {

  @Autowired(IFileServiceClient)
  private readonly fileSystem: FileServiceClient;

  @Autowired(AbstractHttpFileService)
  private httpImpl: HttpFileService;

  @Autowired(AppConfig)
  private readonly appConfig: AppConfig;

  @Autowired(IWorkspaceService)
  private readonly workspaceService: IWorkspaceService;

  @Autowired()
  private readonly extFsProvider: ExtFsProvider;

  async onFileServiceReady() {
    await this.httpImpl.initWorkspace(Uri.file(this.appConfig.workspaceDir!));
  }

  registerProvider(registry: IFileServiceClient) {
    registry.registerProvider(EXTENSION_PROVIDER_SCHEME, this.extFsProvider);
    // anycode 插件读取
    registry.registerProvider(HTTPS_PROVIDER_SCHEME, this.extFsProvider);
    registry.registerProvider(HTTP_PROVIDER_SCHEME, this.extFsProvider);

  }

  registerStaticResolver(service: StaticResourceService): void {
    // 用来打开 raw 文件，如 jpg
    service.registerStaticResourceProvider({
      scheme: 'file',
      resolveStaticResource: (uri: URI) => {
        // file 协议统一走 scm raw 服务
        // https://127.0.0.1:8081/asset-service/v3/project/$repo/repository/blobs/$ref
        // GET /api/v3/projects/{id}/repository/blobs/{sha}
        const assetsUri = new URI(this.appConfig.staticServicePath || EXPRESS_SERVER_PATH);
        const rootUri = new URI(this.workspaceService.workspace?.uri!);
        const relativePath = rootUri.relative(uri);
        return assetsUri
          .withPath(
            new Path('asset-service/v3/projects')
            .join(
              'repository/blobs',
            ),
          )
          .withQuery(`filepath=${relativePath?.toString()}`);
      },
      roots: [this.appConfig.staticServicePath || EXPRESS_SERVER_PATH],
    });
    // 插件静态资源路径
    service.registerStaticResourceProvider({
      scheme: EXTENSION_PROVIDER_SCHEME,
      resolveStaticResource: (uri: URI) => {
        // ext 协议统一走 scheme 头转换为 https
        return uri.withScheme('https');
      },
      roots: [this.appConfig.staticServicePath || EXPRESS_SERVER_PATH],
    });
  }
}

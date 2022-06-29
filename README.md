# 概览

OpenSumi 提供了纯前端版本的接入能力，可以让你脱离 node 的环境，在纯浏览器环境下，通过简单的 B/S 架构提供相对完整的 IDE 能力。
在开始运行前，请先保证本地的环境已经安装 Node.js 10.15.x 或以上版本。同时 OpenSumi 依赖一些 Node.js Addon，为了确保这些 Addon 能够被正常编译运行，建议参考  [node-gyp](https://github.com/nodejs/node-gyp#installation)  中的安装指南来搭建本地环境。

# 快速开始

克隆项目 opensumi/ide-startup-lite，进入目录执行以下命令启动 IDE：

```shell
$ git clone https://github.com/opensumi/ide-startup-lite.git
$ cd ide-startup-lite
$ yarn                 # 安装依赖
$ yarn compile:ext-worker   # 编译 webworker 插件环境
$ yarn compile:webview   # 编译 webview
$ yarn start         # 启动
```

启动后访问 8080 端口即可预览 IDE。

[![截图](https://img.alicdn.com/imgextra/i4/O1CN01W0RcLw1Mb3mZBWLjS_!!6000000001452-2-tps-3104-1974.png)](https://opensumi.github.io/ide-startup-lite/)

距离一个完整可用的纯前端版 IDE 还需要以下实现：

* 文件服务配置 *（必选）
* 插件配置
* 语言能力配置
* 搜索服务配置

# 文件服务配置

与容器版、electron版这种全功能 IDE 不同的是，纯前端版本 IDE 一般都服务于一个垂直、特定的场景，比如代码查看、codereview 等等，对应的底层能力是服务化的。且由于浏览器本身没有文件系统，因此需要一个外部的数据源来提供和维护文件信息。在纯前端版本，我们需要开发者实现以下两个方法来支持基础的代码查看能力：

> 文件位置：`web-lite/file-provider/http-file-service.ts`

* `readDir(uri: Uri): Promise<Array<{type: ‘tree’ | ‘leaf’, path: string}>> `：返回目录结构信息
* `readFile(uri: Uri, encoding?: string): Promise<string>`：返回文件内容

实现上述两个方法即可支持只读模式下的 IDE 能力。如果需要支持代码编辑能力，还需要实现下面三个方法：

* `updateFile(uri: Uri, content: string, options: { encoding?: string; newUri?: Uri; }): Promise<void>`
* `createFile(uri: Uri, content: string, options: { encoding?: string; }): Promise<void>`
* `deleteFile(uri: Uri, options: { recursive?: boolean }): Promise<void>`

代码修改后，会先调用对应方法同步到集成方的服务端，之后浏览器端也会在内存中缓存一份新的代码，刷新后失效。

# 插件声明

纯前端环境下由于没有文件系统，无法通过插件扫描的逻辑获取已安装插件的列表及其对应的详细信息，需要提前在集成时进行声明。

纯前端插件在上架插件市场时，会自动同步一份需要的资源到 oss 上（需要开启配置 `{ “enableOpenSumiWebAssets”: true }`，开启后插件构建时会自动生成需要托管的目录列表文件 sumi-meta.json）。因此在内网环境下，要使用上传到插件市场的插件，只需要在插件列表里声明目标插件的 id 和版本即可，剩余逻辑已被抹平：

> 文件位置：`web-lite/extension/index.ts`

```typescript
const extensionList = [
  { id: ‘OpenSumi.vsicons-slim’, version: ‘1.0.4’ },
  { id: ‘tao.o2-cr-theme’, version: ‘2.6.3’ },
  { id: ‘alex.typescript-language-features-worker’, version: ‘1.0.0-beta.2’ }
];
```

对于外网用户，可以将插件打包生成的需要托管的部分资源自行上传到 oss 或 cdn 上，然后修改插件市场的 oss 基础路径为自定义路径即可。

# 语法高亮及代码提示

## 语法高亮

出于性能考虑，纯前端版本的静态语法高亮能力默认不通过插件来注册，我们将常见的语法封装到了一个统一的npm包内，直接声明想要支持的语法即可：

> 文件位置：`web-lite/grammar/index.contribution.ts`

```typescript
const languages = [
  ‘html’,
  ‘css’,
  ‘javascript’,
  ‘less’,
  ‘markdown’,
  ‘typescript’,
];
```

> 注：我们提供了直接 Require 和动态 import 两种方式来引入语法声明文件，前者会使得 bundleSize 变大，后者部署成本会更高，集成时可自行选择

## 单文件语法服务

OpenSumi 基于纯前端插件（worker版）能力，提供了常见语法的基础提示。由于没有文件服务，worker 版本语法提示插件只支持单文件的代码提示，不支持跨文件分析，对于纯前端的轻量编辑场景而言，基本上是够用的。目前可选的语法提示插件有：

```typescript
const languageExtensions = [
	{ id: 'alex.typescript-language-features-worker', version: '1.0.0-beta.2' },
  { id: 'alex.markdown-language-features-worker', version: '1.0.0-beta.2' },
  { id: 'alex.html-language-features-worker', version: '1.0.0-beta.1' },
  { id: 'alex.json-language-features-worker', version: '1.0.0-beta.1' },
  { id: 'alex.css-language-features-worker', version: '1.0.0-beta.1' }
]
```

将语法提示插件直接加入插件列表即可。

## Lsif 语法服务

对于代码查看、Code review 这一类纯浏览场景，基于离线索引分析的 [LSIF 方案](https://microsoft.github.io/language-server-protocol/specifications/lsif/0.6.0/specification/) 可以很好的支持跨文件Hover 提示，代码跳转的需求，且不需要浏览器端承担任何额外的分析开销。OpenSumi 纯前端版集成了 lsif client，只需要简单的对接即可接入 lsif 服务：

> 文件位置：`web-lite/language-service/lsif-service/lsif-client.ts`

```typescript
export interface ILsifPayload {
  repository: string;
  commit: string;
  path: string;
  character: number;
  line: number;
}

export interface ILsifClient {
  exists(repo: string, commit: string): Promise<boolean>;
  hover(params: ILsifPayload): Promise<vscode.Hover>;
  definition(params: ILsifPayload): Promise<vscode.Location[]>
  reference(params: ILsifPayload): Promise<vscode.Location[]>
}
```

# 搜索能力

搜索功能属于可选实现，默认不开启搜索功能。实现搜索能力的核心在于实现 file-search 和 search 模块的后端部分。

## 文件搜索

要实现文件搜索功能（通过cmd+p触发），需要实现以下方法：

```typescript
export interface IFileSearchService {
  /**
   * finds files by a given search pattern.
   * @return the matching paths, relative to the given `options.rootUri`.
   */
  find(searchPattern: string, options: IFileSearchService.Options, cancellationToken?: CancellationToken): Promise<string[]>;
}

```

实现后替换默认的 mock-file-seach.ts 即可。

## 文件内容搜索

文件内容搜索功能的实现需要改造 `search.service.ts`，暂不提供官方实现。

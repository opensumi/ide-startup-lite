# KAITIAN 服务化集成版

KAITIAN 服务化版本，功能上支持文件读写（可以选择只实现读），Browser + Worker 端插件（暂时仅支持静态的插件贡献点，待接入动态插件能力）。暂不支持的 feature 包括：

- 版本管理（SCM）
- 跨文件搜索（Content Search & Quick Search）
- 插件市场（目前需要集成侧维护插件信息）
- Debug

运行 `SCM_PLATFORM=antcode ANTCODE_SK=[your antcode sk] LSIF_HOST=https://redcoast.alipay.com  yarn start:lite`（蚂蚁）或 `SCM_PLATFORM=aone AONECODE_SK=[your gitlab sk] yarn start:lite`（集团）体验对接 antcode、aonecode 服务的 IDE 实现。其中 antcode 的 sample 实现了基于 LSIF 的 hover 和 定义跳转能力。
 
## 集成方案

集成侧需要修改的主要分为两个部分，分别属于文件读取、写入的实现和插件信息的维护。

### 文件读写实现

> 参考实现：`src/simple-module/fs.contribution.ts`

实现 HttpFileServiceBase，用于初始化 BrowserFsProvider。

```typescript
@Injectable()
class CustomHttpFileService extends HttpFileServiceBase {
  // 自行实现IMetaService
  @Autowired(IMetaService)
  metaService: IMetaService;
  // 读取的方法是必须实现的
  async readFile(uri: Uri, encoding?: string): Promise<string> {}
  async readDir(uri: Uri) {}: Promise<Array<{
      type: 'tree' | 'leaf';
      path: string;
  }>> {}
  // 按需实现文件写入（写入BrowserFs时同步）
}
injector.addProviders({
  token: HttpFileServiceBase,
  useClass: CustomHttpFileService,
});
```

### 插件信息传入

> 参考实现：`src/simple-module/extension.contribution.ts`

使用自定义的 extensionMetadatas 覆盖 IExtensionContributions 的定义：

```typescript
export const vscAuthority = 'kt-ext://cdn.jsdelivr.net/gh/microsoft/vscode/extensions';
export const ExtensionContributions: IExtensionMetaData[] = [
  {
    id: 'themeDefaults',
    extensionId: 'tao.themeDefaults',
    path: vscAuthority + '/theme-seti',
    extraMetadata: {},
    realPath: vscAuthority + '/theme-seti',
    extendConfig: {},
    defaultPkgNlsJSON: undefined,
    packageNlsJSON: undefined,
    packageJSON: {
      'contributes': {
        'iconThemes': [
          {
            'id': 'vs-seti',
            'label': 'Seti (Visual Studio Code)',
            'path': './icons/vs-seti-icon-theme.json',
          },
        ],
      },
    },
  },
];
injector.addProviders({
  token: IExtensionContributions,
  useValue: ExtensionContributions,
})
```

## 无编辑器场景

在 KAITIAN 编辑器的设计中，不同的 uri scheme 对应不同的编辑器打开类型，可以通过 BrowserEditorContribution 来为自定义的 scheme 注册不同的 EditorComponent：

```typescript
@Domain(BrowserEditorContribution)
export class FileSystemEditorComponentContribution implements BrowserEditorContribution {
  registerEditorComponent(editorComponentRegistry: EditorComponentRegistry) {
    editorComponentRegistry.registerEditorComponent({
      component: ImagePreview,
      uid: IMAGE_PREVIEW_COMPONENT_ID,
      scheme: 'file',
    });
  }
}
```

component 的 props 类型为：

```typescript
export type ReactEditorComponent<MetaData = any> = React.ComponentClass<{resource: IResource<MetaData>}> | React.FunctionComponent<{resource: IResource<MetaData>}>;
export interface IResource<MetaData = any> {
  // 资源名称
  name: string;
  // 资源URI
  uri: URI;
  // 资源icon的class
  icon: string;
  // 资源的额外信息
  metadata?: MetaData;
  // 资源已被删除
  deleted?: any;
}
```

注：由于 command、contextKey 等功能实现依赖了 monaco，故去除代码编辑器并不能去除monaco依赖。
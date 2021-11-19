import { Injector } from '@ali/common-di';
import { ClientApp, IClientAppOpts, DEFAULT_WORKSPACE_STORAGE_DIR_NAME, Uri } from '@ali/ide-core-browser';
import { ensureDir } from '@ali/ide-core-common/lib/browser-fs/ensure-dir';
import { AbstractHttpFileService, BrowserFsProvider, BROWSER_HOME_DIR } from './web-lite/file-provider/browser-fs-provider';
import * as BrowserFS from 'browserfs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HttpFileService } from './web-lite/file-provider/http-file.service';
import { IDiskFileProvider } from '@ali/ide-file-service/lib/common';

export async function renderApp(opts: IClientAppOpts) {
  const injector = new Injector();
  opts.injector = injector;

  opts.workspaceDir = opts.workspaceDir || process.env.WORKSPACE_DIR;
  // 跟后端通信部分配置，需要解耦
  opts.extensionDir = opts.extensionDir || process.env.EXTENSION_DIR;
  opts.wsPath =  process.env.WS_PATH || 'ws://127.0.0.1:8000';  // 代理测试地址: ws://127.0.0.1:8001
  opts.extWorkerHost = opts.extWorkerHost || process.env.EXTENSION_WORKER_HOST || 'http://localhost:8080/worker.host.js'; // `http://127.0.0.1:8080/kaitian/ext/worker-host.js`; // 访问 Host
  opts.webviewEndpoint = opts.webviewEndpoint || `http://localhost:50998`;

  opts.editorBackgroundImage = 'https://img.alicdn.com/tfs/TB1Y6vriuL2gK0jSZFmXXc7iXXa-200-200.png';

  // TODO: 框架在新版本加了不允许覆盖file协议的限制，这里通过DI覆盖，后续需要确认下是否要必要加这个限制
  injector.addProviders({
    token: AbstractHttpFileService,
    useClass: HttpFileService,
  });
  const httpFs: AbstractHttpFileService = injector.get(AbstractHttpFileService);
  injector.addProviders({
    token: IDiskFileProvider,
    useValue: new BrowserFsProvider(httpFs, { rootFolder: opts.workspaceDir }),
  });

  BrowserFS.configure({
    fs: "MountableFileSystem",
    options: {
      [opts.workspaceDir]: { fs: "InMemory" },
      // home目录挂载到lcoalstorage来支持持久化
      '/home': { fs: "LocalStorage", options: {} },
    }
  }, async function (e) {
    await ensureDir(opts.workspaceDir!);
    await ensureDir(BROWSER_HOME_DIR.codeUri.fsPath);
    await ensureDir(BROWSER_HOME_DIR.path.join(DEFAULT_WORKSPACE_STORAGE_DIR_NAME).toString());
    const app = new ClientApp(opts);
    app.fireOnReload = (forcedReload: boolean) => {
      window.location.reload();
    };

    const targetDom = document.getElementById('main')!;
    await app.start((app) => {
      const MyApp = <div id='custom-wrapper' style={{ height: '100%', width: '100%' }}>{app}</div>;
      return new Promise((resolve) => {
        ReactDOM.render(MyApp, targetDom, resolve);
      });
    });
    const loadingDom = document.getElementById('loading');
    if (loadingDom) {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      loadingDom.classList.add('loading-hidden');
      // await new Promise((resolve) => setTimeout(resolve, 500));
      loadingDom.remove();
    }
  });
}

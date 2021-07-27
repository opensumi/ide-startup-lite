import '@ali/ide-i18n/lib/browser';
import { SlotLocation } from '@ali/ide-core-browser';
import * as React from 'react';

import { CommonBrowserModules } from './common-modules';
import { renderApp } from './render-app';

// 引入公共样式文件
import '@ali/ide-core-browser/lib/style/index.less';

import { WebLiteModule }  from './web-lite';

import { SampleModule } from './src';

import './styles.less';
import { LayoutComponent } from './custom-layout-component';

// 视图和slot插槽的对应关系
const layoutConfig = {
  [SlotLocation.top]: {
    modules: ['@ali/ide-menu-bar'],
  },
  [SlotLocation.action]: {
    modules: [''],
  },
  [SlotLocation.left]: {
    modules: ['@ali/ide-explorer', 'test-view'],
  },
  [SlotLocation.main]: {
    modules: ['@ali/ide-editor'],
  },
  [SlotLocation.statusBar]: {
    modules: ['@ali/ide-status-bar'],
  },
  [SlotLocation.bottom]: {
    modules: ['@ali/ide-output'],
  },
  [SlotLocation.extra]: {
    modules: [],
  },
};

// optional for sw registration
// serviceWorker.register();

renderApp({
  modules: [ ...CommonBrowserModules, WebLiteModule, SampleModule ],
  layoutConfig,
  layoutComponent: LayoutComponent,
  useCdnIcon: true,
  noExtHost: true,
  extWorkerHost: 'https://g.alicdn.com/tao-ide/o2-sandbox/0.0.5/worker.host.js',
  defaultPreferences: {
    'general.theme': 'ide-light',
    'general.icon': 'vsicons-slim',
    'application.confirmExit': 'never',
    'editor.quickSuggestionsDelay': 100,
    'editor.quickSuggestionsMaxCount': 50,
    'editor.scrollBeyondLastLine': false,
    'general.language': 'en-US',
  },
  workspaceDir: '/test',
  extraContextProvider: (props) => <div id='#hi' style={{ width: '100%', height: '100%' }}>{props.children}</div>,
  iconStyleSheets: [
    {
      iconMap: {
        explorer: 'fanhui',
        shangchuan: 'shangchuan',
      },
      prefix: 'tbe tbe-',
      cssPath: '//at.alicdn.com/t/font_403404_1qiu0eed62f.css',
    },
  ],
});

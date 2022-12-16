<h1 align="center">OpenSumi Web Lite Sample</h1>
<div align="center">

[![CLA assistant][cla-image]][cla-url]
[![License][license-image]][license-url]
[![Discussions][discussions-image]][discussions-url]

[license-url]: https://github.com/opensumi/ide-startup-lite/blob/main/LICENSE
[license-image]: https://img.shields.io/npm/l/@opensumi/ide-core-common.svg
[cla-image]: https://cla-assistant.io/readme/badge/opensumi/ide-startup-lite
[cla-url]: https://cla-assistant.io/opensumi/ide-startup-lite
[discussions-image]: https://img.shields.io/badge/discussions-on%20github-blue
[discussions-url]: https://github.com/opensumi/core/discussions

</div>

本项目基于 [GitHub REST API](https://docs.github.com/en/rest) 实现，用于展示如何在纯浏览器环境下运行 OpenSumi 项目。

![perview](https://img.alicdn.com/imgextra/i4/O1CN01vD1TfU287qAqtprYS_!!6000000007886-2-tps-1365-891.png)

[English](./README.md) | 简体中文

## 预览

在线预览 [opensumi.github.io/ide-startup-lite](https://opensumi.github.io/ide-startup-lite)

## 启动

```bash
$ git clone https://github.com/opensumi/ide-startup-lite.git
$ cd ide-startup-lite
$ yarn
$ yarn start
```

浏览器打开 [http://127.0.0.1:8081](http://127.0.0.1:8081).

项目会打开 `https://github.com/opensumi/core` 仓库作为默认工作区，如果你希望打开其他 Git 仓库，可以在访问路径上追加 hash 参数，如：

```
http://127.0.0.1:8081#https://github.com/opensumi/core
```

同时，你也可以通过参数打开特定 `tag` 或 `branch` 代码，如：

```
http://127.0.0.1:8081#https://github.com/opensumi/core/tree/v2.15.0
```

## 浏览器插件（Web Extension）

在你使用本项目开发前，你需要先了解 “什么是 浏览器插件（Web Extension）”，你可以通过 VS Code 的这篇文档进行了解 [浏览器插件（Web Extension）](https://code.visualstudio.com/api/extension-guides/web-extensions)。

你可以在 OpenSumi 中使用绝大部分浏览器插件（Web Extension）。

我们在 [web-lite/extension/index.ts#L6](https://github.com/opensumi/ide-startup-lite/blob/f129aecb6b5a916d893889335738cc3d4f5444e5/web-lite/extension/index.ts#L6) 文件中声明了一些内置插件，通过这些插件为编辑器提供了一部分代码提示的能力。

同时，你也可以在你的静态服务器中部署你自己的 [浏览器插件（Web Extension）](https://code.visualstudio.com/api/extension-guides/web-extensions) ， 通过在这里 [web-lite/extension/utils.ts#L56](https://github.com/opensumi/ide-startup-lite/blob/f4570890d963207ffdab6d419d6f2cf33c2824fd/web-lite/extension/utils.ts#L56) 修改一些插件加载逻辑，能让你的工程使用更多插件能力。

## 文档

见 [快速开始（纯前端）](https://opensumi.com/zh/docs/integrate/quick-start/lite).

## 协议

Copyright (c) 2019-present Alibaba Group Holding Limited, Ant Group Co. Ltd.

本项目采用 [MIT](LICENSE) 协议。

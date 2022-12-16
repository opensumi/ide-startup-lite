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

This project is implemented based on [GitHub REST API](https://docs.github.com/en/rest) to show how to run the OpenSumi project in a pure browser environment.

![perview](https://img.alicdn.com/imgextra/i4/O1CN01vD1TfU287qAqtprYS_!!6000000007886-2-tps-1365-891.png)

English | [简体中文](./README-zh_CN.md)

## Preview

Online Preview Page: [opensumi.github.io/ide-startup-lite](https://opensumi.github.io/ide-startup-lite)

## Quick Start

```bash
$ git clone https://github.com/opensumi/ide-startup-lite.git
$ cd ide-startup-lite
$ yarn
$ yarn start
```

Open [http://127.0.0.1:8081](http://127.0.0.1:8081).

It will open `https://github.com/opensumi/core` as the default workspace, if you want to open other git repo, you can query it with the hash, like:

```
http://127.0.0.1:8081#https://github.com/opensumi/core
```

Also, you can open it with special `tag` or `branch`, like:

```
http://127.0.0.1:8081#https://github.com/opensumi/core/tree/v2.15.0
```

## Web Extension

Before you use it, you should know 'What's the Web Extensions', see the VS Code docs here [Web Extensions](https://code.visualstudio.com/api/extension-guides/web-extensions).

you can use almost Web Extensions on the OpenSumi.

We declare some buit-in extensions on [web-lite/extension/index.ts#L6](https://github.com/opensumi/ide-startup-lite/blob/f129aecb6b5a916d893889335738cc3d4f5444e5/web-lite/extension/index.ts#L6), with these extensions, you can get some code hinting capabilities inside the editor.

Also, you can add your own [Web Extensions](https://code.visualstudio.com/api/extension-guides/web-extensions) on your static resource server, maybe you need to modify some of the extension fetching logic here [web-lite/extension/utils.ts#L56](https://github.com/opensumi/ide-startup-lite/blob/f4570890d963207ffdab6d419d6f2cf33c2824fd/web-lite/extension/utils.ts#L56).

## Document

See [Quick Start（Pure Front End）](https://opensumi.com/en/docs/integrate/quick-start/lite).

## License

Copyright (c) 2019-present Alibaba Group Holding Limited, Ant Group Co. Ltd.

Licensed under the [MIT](LICENSE) license.

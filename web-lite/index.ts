import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule, LogServiceForClientPath } from '@opensumi/ide-core-browser';
import { CommonServerPath, KeytarServicePath } from '@opensumi/ide-core-common';
import { ExtensionNodeServiceServerPath } from '@opensumi/ide-extension/lib/common';
import { FileSearchServicePath } from '@opensumi/ide-file-search/lib/common';
import { DebugPreferences } from '@opensumi/ide-debug/lib/browser/debug-preferences';

import { ExtensionClientService } from './extension';
import { FileProviderContribution } from './file-provider/index.contribution';
import { TextmateLanguageGrammarContribution } from './grammar/index.contribution';
import { BrowserCommonServer } from './overrides/browser-common-server';
import { MockFileSearch } from './overrides/mock-file-search';
import { MockLogServiceForClient } from './overrides/mock-logger';
import { MockCredentialService } from './overrides/mock-credential.service';
import { FsProviderContribution } from './file-system-provider/index.contribution';
import { WalkThroughSnippetDocumentProvider } from './file-system-provider/fs-provider';
import { MenuOverrideContribution } from './overrides/menu.contribution';
import { IDebugService } from '@opensumi/ide-debug';
import { ITerminalProfileService } from '@opensumi/ide-terminal-next';

@Injectable()
export class WebLiteModule extends BrowserModule {
  providers: Provider[] = [
    {
      token: WalkThroughSnippetDocumentProvider,
      useClass: WalkThroughSnippetDocumentProvider,
    },
    {
      token: CommonServerPath,
      useClass: BrowserCommonServer,
    },
    {
      token: ExtensionNodeServiceServerPath,
      useClass: ExtensionClientService,
    },
    {
      token: FileSearchServicePath,
      useClass: MockFileSearch,
    },
    {
      token: LogServiceForClientPath,
      useClass: MockLogServiceForClient,
    },
    {
      token: KeytarServicePath,
      useClass: MockCredentialService,
    },
    {
      token: DebugPreferences,
      useValue: {},
    },
    {
      token: IDebugService,
      useValue: {},
    },
    {
      token: ITerminalProfileService,
      useValue: {},
    },
    FileProviderContribution,
    FsProviderContribution,
    TextmateLanguageGrammarContribution,
    MenuOverrideContribution,
  ];
}

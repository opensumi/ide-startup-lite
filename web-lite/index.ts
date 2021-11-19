import { Provider, Injectable } from '@ali/common-di';
import { BrowserModule, LogServiceForClientPath } from '@ali/ide-core-browser';
import { CommonServerPath, KeytarServicePath } from '@ali/ide-core-common';
import { ExtensionNodeServiceServerPath } from '@ali/ide-kaitian-extension/lib/common';
import { FileSearchServicePath } from '@ali/ide-file-search/lib/common';
import { DebugPreferences } from '@ali/ide-debug/lib/browser';

import { ExtensionClientService } from './extension';
import { FileProviderContribution } from './file-provider/index.contribution';
import { TextmateLanguageGrammarContribution } from './grammar/index.contribution';
// import { LanguageServiceContribution } from './language-service/language.contribution';
// import { LsifServiceImpl } from './language-service/lsif-service';
// import { ILsifService } from './language-service/lsif-service/base';

import { BrowserCommonServer } from './overrides/browser-common-server';
import { MockFileSearch } from './overrides/mock-file-search';
import { MockLogServiceForClient } from './overrides/mock-logger';
import { MockCredentialService } from './overrides/mock-credential.service';

@Injectable()
export class WebLiteModule extends BrowserModule {
  providers: Provider[] = [
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
    FileProviderContribution,
    TextmateLanguageGrammarContribution,
    // lsif client. disabled by default
    // {
    //   token: ILsifService,
    //   useClass: LsifServiceImpl,
    // },
    // LanguageServiceContribution,
  ];
}

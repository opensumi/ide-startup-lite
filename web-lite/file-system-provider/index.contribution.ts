import { Autowired } from '@opensumi/di';
import { Domain, AppConfig } from '@opensumi/ide-core-browser';
import { IEditorDocumentModelContentRegistry } from '@opensumi/ide-editor/lib/browser/doc-model/types';
import { BrowserEditorContribution } from '@opensumi/ide-editor/lib/browser/types';
import {
  StaticResourceContribution,
  StaticResourceService,
} from '@opensumi/ide-static-resource/lib/browser/static.definition';

import { WalkThroughSnipppetDocumentProvider } from './fs-provider';

@Domain(StaticResourceContribution, BrowserEditorContribution)
export class FsProviderContribution
  implements StaticResourceContribution, BrowserEditorContribution
{

  @Autowired(WalkThroughSnipppetDocumentProvider)
  private readonly walkThroughSnipppetDocumentProvider: WalkThroughSnipppetDocumentProvider;

  registerStaticResolver(service: StaticResourceService): void {
  }

  registerEditorDocumentModelContentProvider(registry: IEditorDocumentModelContentRegistry) {
    registry.registerEditorDocumentModelContentProvider(this.walkThroughSnipppetDocumentProvider);
  }
}

import { Autowired } from '@opensumi/di';
import { Domain, AppConfig } from '@opensumi/ide-core-browser';
import { IEditorDocumentModelContentRegistry } from '@opensumi/ide-editor/lib/browser/doc-model/types';
import { BrowserEditorContribution } from '@opensumi/ide-editor/lib/browser/types';
import {
  StaticResourceContribution,
  StaticResourceService,
} from '@opensumi/ide-static-resource/lib/browser/static.definition';

import { WalkThroughSnippetDocumentProvider } from './fs-provider';

@Domain(StaticResourceContribution, BrowserEditorContribution)
export class FsProviderContribution implements StaticResourceContribution, BrowserEditorContribution {
  @Autowired(WalkThroughSnippetDocumentProvider)
  private readonly walkThroughSnippetDocumentProvider: WalkThroughSnippetDocumentProvider;

  registerStaticResolver(service: StaticResourceService): void {}

  registerEditorDocumentModelContentProvider(registry: IEditorDocumentModelContentRegistry) {
    registry.registerEditorDocumentModelContentProvider(this.walkThroughSnippetDocumentProvider);
  }
}

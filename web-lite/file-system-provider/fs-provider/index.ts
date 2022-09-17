import { Injectable } from '@opensumi/di';
import { Schemes, URI } from '@opensumi/ide-core-browser';
import { IEditorDocumentModelContentProvider } from '@opensumi/ide-editor/lib/browser/doc-model/types';
import { Emitter } from '@opensumi/ide-monaco/lib/common/types';

@Injectable()
export class WalkThroughSnippetDocumentProvider implements IEditorDocumentModelContentProvider {
  private value = '';

  handlesScheme(scheme: string) {
    return scheme === Schemes.walkThroughSnippet;
  }

  async provideEditorDocumentModelContent() {
    return this.value;
  }

  isReadonly(): boolean {
    return false;
  }

  private _onDidChangeContent: Emitter<URI> = new Emitter();

  get onDidChangeContent() {
    return this._onDidChangeContent.event;
  }

  preferLanguageForUri() {
    return 'plaintext';
  }
}

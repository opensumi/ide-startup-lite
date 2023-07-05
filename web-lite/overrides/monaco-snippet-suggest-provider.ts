import * as jsoncparser from 'jsonc-parser';

import { Injectable, Autowired } from '@opensumi/di';
import {
  Uri,
  Disposable,
  IDisposable,
  DisposableCollection,
} from '@opensumi/ide-core-common';
import * as monaco from '@opensumi/monaco-editor-core/esm/vs/editor/editor.api';

import {MonacoSnippetSuggestProvider, SnippetLoadOptions} from '@opensumi/ide-monaco/lib/browser/monaco-snippet-suggest-provider'
import * as Npath from 'path';

@Injectable()
export class MonacoSnippetSuggestProviderOverride extends  MonacoSnippetSuggestProvider implements monaco.languages.CompletionItemProvider {

  constructor(){
    super()
  }

  fromPath(path: string, options: SnippetLoadOptions): IDisposable {
    const toDispose = new DisposableCollection(
      Disposable.create(() => {
        /* mark as not disposed */
      }),
    );
    
    const snippetPath = Npath.join(options.extPath, path.replace(/^\.\//, '')).toString()
    const pending = this.loadURI(Uri.parse(snippetPath), options, toDispose);
    const { language } = options;
    const scopes = Array.isArray(language) ? language : language ? [language] : ['*'];
    for (const scope of scopes) {
      const pendingSnippets = this.pendingSnippets.get(scope) || [];
      pendingSnippets.push(pending);
      this.pendingSnippets.set(scope, pendingSnippets);

      toDispose.push(
        Disposable.create(() => {
          const index = pendingSnippets.indexOf(pending);
          if (index !== -1) {
            pendingSnippets.splice(index, 1);
          }

          this.pendingSnippets.delete(scope);
        }),
      );
    }

    return toDispose;
  }
  
}


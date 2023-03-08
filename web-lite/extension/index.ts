
import { Injectable } from '@opensumi/di';
import { IExtensionNodeClientService, IExtraMetaData, IExtensionMetaData } from '@opensumi/ide-extension/lib/common';
import { getExtension } from './utils';

const extensionList = [
  { id: 'alex-ext-public.typescript-language-features-worker', version: '1.53.0-patch.4' },
  { id: 'alex-ext-public.markdown-language-features-worker', version: '1.53.0-patch.2' },
  { id: 'alex-ext-public.html-language-features-worker', version: '1.53.0-patch.3' },
  { id: 'alex-ext-public.json-language-features-worker', version: '1.53.0-patch.3' },
  { id: 'alex-ext-public.css-language-features-worker', version: '1.53.0-patch.3' },
  { id: 'alex-ext-public.vsicons-slim', version: '1.0.5' },
  { id: 'worker-public.ide-ext-theme', version: '2.5.2' },
  // vscode anycode https://github.com/microsoft/vscode-anycode
  { id: 'alex-ext-public.anycode', version: '0.0.67' },
  { id: 'alex-ext-public.anycode-typescript', version: '0.0.5' },
  { id: 'alex-ext-public.anycode-c-sharp', version: '0.0.5' },
  { id: 'alex-ext-public.anycode-cpp', version: '0.0.5' },
  { id: 'alex-ext-public.anycode-go', version: '0.0.5' },
  { id: 'alex-ext-public.anycode-java', version: '0.0.5' },
  { id: 'alex-ext-public.anycode-php', version: '0.0.6' },
  { id: 'alex-ext-public.anycode-python', version: '0.0.5' },
  { id: 'alex-ext-public.anycode-rust', version: '0.0.5' },

];

export const getExtensions: () => Promise<IExtensionMetaData[]> = () => {
  const list = extensionList.map((ext) => getExtension(ext.id, ext.version));
  return Promise.all(list).then((exts) => exts.filter((item) => !!item) as IExtensionMetaData[]);
};

@Injectable()
export class ExtensionClientService implements IExtensionNodeClientService {
  getOpenVSXRegistry(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  restartExtProcessByClient(): void {
    throw new Error('Method not implemented.');
  }
  getElectronMainThreadListenPath(clientId: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async getAllExtensions(scan: string[], extensionCandidate: string[], localization: string, extraMetaData: IExtraMetaData): Promise<IExtensionMetaData[]> {
    const extensionList = await getExtensions();
    return extensionList;
  }
  createProcess(clientId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getExtension(extensionPath: string, localization: string, extraMetaData?: IExtraMetaData | undefined): Promise<IExtensionMetaData | undefined> {
    throw new Error('Method not implemented.');
  }
  infoProcessNotExist(): void {
    throw new Error('Method not implemented.');
  }
  infoProcessCrash(): void {
    throw new Error('Method not implemented.');
  }
  disposeClientExtProcess(clientId: string, info: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateLanguagePack(languageId: string, languagePackPath: string, storagePath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}


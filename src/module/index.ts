import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { SampleContribution } from './index.contribution';

@Injectable()
export class SampleModule extends BrowserModule {
  providers: Provider[] = [
    SampleContribution,
  ];
}

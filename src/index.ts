import { Provider, Injectable } from '@ali/common-di';
import { BrowserModule } from '@ali/ide-core-browser';
import { SampleContribution } from './index.contribution';

@Injectable()
export class SampleModule extends BrowserModule {
  providers: Provider[] = [
    SampleContribution,
  ];
}

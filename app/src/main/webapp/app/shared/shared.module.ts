import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Oauth2SharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [Oauth2SharedCommonModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [Oauth2SharedCommonModule, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Oauth2SharedModule {
  static forRoot() {
    return {
      ngModule: Oauth2SharedModule
    };
  }
}

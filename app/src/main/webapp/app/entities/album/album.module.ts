import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { Oauth2SharedModule } from 'app/shared';
import {
  AlbumComponent,
  AlbumDetailComponent,
  AlbumUpdateComponent,
  AlbumDeletePopupComponent,
  AlbumDeleteDialogComponent,
  albumRoute,
  albumPopupRoute
} from './';

const ENTITY_STATES = [...albumRoute, ...albumPopupRoute];

@NgModule({
  imports: [Oauth2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AlbumComponent, AlbumDetailComponent, AlbumUpdateComponent, AlbumDeleteDialogComponent, AlbumDeletePopupComponent],
  entryComponents: [AlbumComponent, AlbumUpdateComponent, AlbumDeleteDialogComponent, AlbumDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Oauth2AlbumModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

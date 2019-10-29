import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Oauth2SharedModule } from 'app/shared/shared.module';
import { PhotoComponent } from './photo.component';
import { PhotoDetailComponent } from './photo-detail.component';
import { PhotoUpdateComponent } from './photo-update.component';
import { PhotoDeletePopupComponent, PhotoDeleteDialogComponent } from './photo-delete-dialog.component';
import { photoRoute, photoPopupRoute } from './photo.route';

const ENTITY_STATES = [...photoRoute, ...photoPopupRoute];

@NgModule({
  imports: [Oauth2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PhotoComponent, PhotoDetailComponent, PhotoUpdateComponent, PhotoDeleteDialogComponent, PhotoDeletePopupComponent],
  entryComponents: [PhotoDeleteDialogComponent]
})
export class Oauth2PhotoModule {}

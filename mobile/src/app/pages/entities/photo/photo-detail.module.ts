import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PhotoDetailPage } from './photo-detail';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';

const routes: Routes = [
    {
      path: '',
      component: PhotoDetailPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];

@NgModule({
    declarations: [
        PhotoDetailPage
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslateModule
    ]
})
export class PhotoDetailPageModule {
}

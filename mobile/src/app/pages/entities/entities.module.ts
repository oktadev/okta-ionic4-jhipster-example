import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { EntitiesPage } from './entities.page';

const routes: Routes = [
  {
    path: '',
    component: EntitiesPage,
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
  , {
    path: 'album',
    loadChildren: './album/album.module#AlbumPageModule'
  }
  , {
    path: 'photo',
    loadChildren: './photo/photo.module#PhotoPageModule'
  }
  , {
    path: 'tag',
    loadChildren: './tag/tag.module#TagPageModule'
  }
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes), TranslateModule],
  declarations: [EntitiesPage]
})
export class EntitiesPageModule {}

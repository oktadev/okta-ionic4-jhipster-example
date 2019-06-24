import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'album',
        loadChildren: './album/album.module#Oauth2AlbumModule'
      },
      {
        path: 'photo',
        loadChildren: './photo/photo.module#Oauth2PhotoModule'
      },
      {
        path: 'tag',
        loadChildren: './tag/tag.module#Oauth2TagModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Oauth2EntityModule {}

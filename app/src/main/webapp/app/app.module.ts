import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Oauth2SharedModule } from 'app/shared/shared.module';
import { Oauth2CoreModule } from 'app/core/core.module';
import { Oauth2AppRoutingModule } from './app-routing.module';
import { Oauth2HomeModule } from './home/home.module';
import { Oauth2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Oauth2SharedModule,
    Oauth2CoreModule,
    Oauth2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Oauth2EntityModule,
    Oauth2AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class Oauth2AppModule {}

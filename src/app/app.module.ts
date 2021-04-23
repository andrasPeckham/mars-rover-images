import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { ImagesContainerComponent } from './components/cockpit/images-container/images-container.component';
import { ImageComponent } from './components/cockpit/images-container/image/image.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { LeftRightArrowsComponent } from './components/cockpit/left-right-arrows/left-right-arrows.component';
import { ImageModalComponent } from './components/cockpit/images-container/image/image-modal/image-modal.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { HomeComponent } from './components/home/home.component';
import { StarsComponent } from './components/stars/stars.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { RoversComponent } from './components/rovers/rovers.component';
import { AboutNasaComponent } from './components/about-nasa/about-nasa.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'search', component: CockpitComponent},
  {path: 'about', component: AboutComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    ImagesContainerComponent,
    ImageComponent,
    LeftRightArrowsComponent,
    ImageModalComponent,
    WelcomeComponent,
    AboutComponent,
    ToggleButtonComponent,
    HomeComponent,
    StarsComponent,
    RoversComponent,
    AboutNasaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled'
    }),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

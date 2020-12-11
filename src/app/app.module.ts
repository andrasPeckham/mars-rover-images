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
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { AboutComponent } from './components/about/about.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { HomeComponent } from './components/home/home.component';

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
    TopMenuComponent,
    AboutComponent,
    ToggleButtonComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

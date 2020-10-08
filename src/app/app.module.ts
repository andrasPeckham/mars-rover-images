import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { ImagesContainerComponent } from './components/images-container/images-container.component';
import { ImageComponent } from './components/image/image.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { LeftRightArrowsComponent } from './components/cockpit/left-right-arrows/left-right-arrows.component';

@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    ImagesContainerComponent,
    ImageComponent,
    LeftRightArrowsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

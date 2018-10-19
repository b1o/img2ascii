import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Img2asciiComponent } from './components/img2ascii/img2ascii.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ImageZoneComponent } from './components/image-zone/image-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    Img2asciiComponent,
    ImageZoneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [Img2asciiComponent]
})
export class AppModule { }

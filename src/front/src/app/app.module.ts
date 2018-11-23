import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { components as coreComponents } from '../core/components';
import { services as coreServices } from '../core/services';
import { guards as coreGuards } from '../core/guards';

@NgModule({
  declarations: [
    AppComponent,
    ...coreComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ...coreServices,
    ...coreGuards
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

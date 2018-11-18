import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MobxAngularModule } from 'mobx-angular';

import { ChatRoutingModule } from './chat-routing.module';
import { services } from './services';
import { components } from './components';
import { stores } from './stores';
import { pipes } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ChatRoutingModule,
    MobxAngularModule
  ],
  declarations: [
    ...components,
    ...pipes
  ],
  providers: [
    ...services,
    ...stores
  ]
})
export class ChatModule { }

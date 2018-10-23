import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { services } from './services';
import { components } from './components';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule
  ],
  declarations: [
    ...components
  ],
  providers: [
    ...services
  ]
})
export class ChatModule { }

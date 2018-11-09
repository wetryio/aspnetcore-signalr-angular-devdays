import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChatRoutingModule } from './chat-routing.module';
import { services } from './services';
import { components } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
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

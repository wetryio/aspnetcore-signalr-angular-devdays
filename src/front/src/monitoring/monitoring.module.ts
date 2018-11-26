import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring.component';
import { MonitoringService } from './services/monitoring.service';

@NgModule({
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    ChartsModule
  ],
  declarations: [
    MonitoringComponent
  ],
  providers: [
    MonitoringService
  ]
})
export class MonitoringModule { }

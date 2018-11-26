import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../core/components';
import { AuthGuard } from '../core/guards';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat'
  }, {
    path: 'chat',
    loadChildren: '../chat/chat.module#ChatModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  // ...(environment.production ? [] : [
    {
      path: 'monitoring',
      loadChildren: '../monitoring/monitoring.module#MonitoringModule',
    },
  // ]),
  {
    path: '**',
    redirectTo: '/chat'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

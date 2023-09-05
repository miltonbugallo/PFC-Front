import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SwitchsComponent } from './switchs/switchs.component';
import { NopageFoundComponent } from '../nopage-found/nopage-found.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'switchs', component: SwitchsComponent, data: { titulo: 'Switchs' } }
    ]
  },
  { path: '**', component: NopageFoundComponent, }
]

@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SwitchsComponent } from './switchs/switchs.component';
import { NopageFoundComponent } from '../nopage-found/nopage-found.component';
import { AgentesComponent } from './agentes/agentes.component';
import { IpsComponent } from './ips/ips.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'switches', component: SwitchsComponent, data: { titulo: 'Switches' } },
      { path: 'agentes', component: AgentesComponent, data: { titulo: 'Agentes' } },
      { path: 'ips', component: IpsComponent, data: { titulo: 'Ips' } }
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

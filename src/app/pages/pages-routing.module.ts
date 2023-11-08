import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SwitchsComponent } from './switchs/switchs.component';
import { AgentesComponent } from './agentes/agentes.component';
import { IpsDuplicadasAgentesSinEquipoComponent } from './ips-duplicadas-agentes-sin-equipo/ips-duplicadas-agentes-sin-equipo.component';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { IpsComponent } from './ips/ips.component';
import { AlertasComponent } from './alertas/alertas.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'ips', component: IpsComponent, data: { titulo: 'Ips' } },
      { path: 'switches', component: SwitchsComponent, data: { titulo: 'Switchs' } },
      { path: 'agentes', component: AgentesComponent, data: { titulo: 'Agentes' } },
      { path: 'ipsDuplicadasAgentesSinEquipo', component: IpsDuplicadasAgentesSinEquipoComponent, data: { titulo: 'IPs Duplicadas - Agentes Sin Equipo' } },
      { path: 'dispositivos', component: DispositivosComponent, data: { titulo: 'Dispositivos' } },
      { path: 'estadisticas', component: EstadisticasComponent, data: { titulo: 'Estadisticas' } },
      { path: 'alertas', component: AlertasComponent, data: { titulo: 'Alertas' } },

    ]
  }
]

@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }

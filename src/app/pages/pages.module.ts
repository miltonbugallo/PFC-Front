import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { SwitchsComponent } from './switchs/switchs.component';
import { SwitchsFormComponent } from '../forms/switchs-form/switchs-form.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AgentesComponent } from './agentes/agentes.component';
import { AgentesFormComponent } from '../forms/agentes-form/agentes-form.component';
import { IpsDuplicadasAgentesSinEquipoComponent } from './ips-duplicadas-agentes-sin-equipo/ips-duplicadas-agentes-sin-equipo.component';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    SwitchsComponent,
    SwitchsFormComponent,
    AgentesComponent,
    AgentesFormComponent,
    IpsDuplicadasAgentesSinEquipoComponent,
    DispositivosComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [
    DashboardComponent,
  ]
})
export class PagesModule { }
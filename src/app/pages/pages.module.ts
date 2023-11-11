import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { SwitchsComponent } from './switchs/switchs.component';
import { SwitchsFormComponent } from '../forms/switchs-form/switchs-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AgentesComponent } from './agentes/agentes.component';
import { AgentesFormComponent } from '../forms/agentes-form/agentes-form.component';
import { IpsDuplicadasAgentesSinEquipoComponent } from './ips-duplicadas-agentes-sin-equipo/ips-duplicadas-agentes-sin-equipo.component';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraficoAgentesComponent } from '../graficas/grafico-agentes/grafico-agentes.component';
import { GraficoRamComponent } from '../graficas/grafico-ram/grafico-ram.component';
import { GraficoSOComponent } from '../graficas/grafico-so/grafico-so.component';
import { GraficoIpsConflictivasComponent } from '../graficas/grafico-ips-conflictivas/grafico-ips-conflictivas.component';
import { IpsComponent } from './ips/ips.component';
import { IpsFormComponent } from '../forms/ips-form/ips-form.component';
import { AlertasComponent } from './alertas/alertas.component';
import { SistemasOperativosComponent } from './sistemas-operativos/sistemas-operativos.component';
import { SectoresComponent } from './sectores/sectores.component';
import { SistemasOperativosFormComponent } from '../forms/sistemas-operativos-form/sistemas-operativos-form.component';
import { SectoresFormComponent } from '../forms/sectores-form/sectores-form.component';

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
    EstadisticasComponent,
    GraficoAgentesComponent,
    GraficoRamComponent,
    GraficoSOComponent,
    GraficoIpsConflictivasComponent,
    IpsComponent,
    IpsFormComponent,
    AlertasComponent,
    SistemasOperativosComponent,
    SistemasOperativosFormComponent,
    SectoresComponent,
    SectoresFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class PagesModule { }
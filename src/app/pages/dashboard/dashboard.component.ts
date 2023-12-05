import { Component } from '@angular/core';
import { agenteModel } from 'src/app/models/agenteModel';
import { ConexionSwitch } from 'src/app/models/conexionSwitch';
import { switchModel } from 'src/app/models/switchModel';
import { AgentesService } from 'src/app/services/agentes.service';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { SwitchsService } from 'src/app/services/switchs.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 
  constructor(
    private datatableService: DataTableConfigService,
    private switchService: SwitchsService,
    private agenteService: AgentesService, private estadisticasService: EstadisticasService
  ) { }

  public agentesData: agenteModel[] = []
  public switchesData: switchModel[] = []
  conexionSwitch: any = ConexionSwitch
  titulo1 = "Cantidad de agentes";
  titulo2 = "Cantidad ips conflictivas y correctas";


  ngOnInit() {
    this.obtenerSwitches(),
    this.obtenerAgentes(),
    this.estadisticasService.getEstadisticas().subscribe(() => {});
  }
  
  
  private initializeDataTableAgentes() {
    const baseDatatableConfig = this.datatableService.getDatatableConfig();
    
    const customConfig = {
      buttons: [],
      searching: false,
      ordering: false,
      paging: false,
    };
  
    const customtableConfig = Object.assign({}, baseDatatableConfig, customConfig);
    if ($.fn.DataTable.isDataTable("#agentesTable")) {
      $("#agentesTable").DataTable().destroy();
    }
    $(function () {
      $("#agentesTable").DataTable(customtableConfig).buttons().container().appendTo('#agentesTable_wrapper .col-md-6:eq(0)');
    });
  }

  private initializeDataTableSwitchs() {
    const baseDatatableConfig = this.datatableService.getDatatableConfig();
    
    const customConfig = {
      buttons: [],
      searching: false,
      ordering: false,
      paging: false,
    };
  
    const customtableConfig = Object.assign({}, baseDatatableConfig, customConfig);
    if ($.fn.DataTable.isDataTable("#switchTable")) {
      $("#switchTable").DataTable().destroy();
    }
    $(function () {
      $("#switchTable").DataTable(customtableConfig).buttons().container().appendTo('#switchTable_wrapper .col-md-6:eq(0)');
    });
  }
  
  obtenerAgentes() {
    this.agenteService.getAgentes().subscribe((agentes) => {
      this.agentesData = agentes;
      this.initializeDataTableAgentes();
    });
  }

  obtenerSwitches() {
    this.switchService.getSwitch().subscribe((switchs) => {
      this.switchesData = switchs;
      this.initializeDataTableSwitchs();
    });
  }
}

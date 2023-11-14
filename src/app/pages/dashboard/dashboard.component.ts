import { Component } from '@angular/core';
import { agenteModel } from 'src/app/models/agenteModel';
import { ConexionSwitch } from 'src/app/models/conexionSwitch';
import { switchModel } from 'src/app/models/switchModel';
import { AgentesService } from 'src/app/services/agentes.service';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
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
    private agenteService: AgentesService
  ) { }

  public agentesData: agenteModel[] = []
  public switchesData: switchModel[] = []
  conexionSwitch: any = ConexionSwitch
  titulo1 = "Cantidad de agentes por sector";
  titulo2 = "Cantidad ips conflictivas y correctas";

  ngOnInit() {
    const baseDatatableConfig = this.datatableService.getDatatableConfig();
    
    const customConfig = {
      buttons: [],
      searching: false,
      paging: false,
    };
  
    const customtableConfig = Object.assign({}, baseDatatableConfig, customConfig);
    $(function () {
      $("#switchTable").DataTable(customtableConfig).buttons().container().appendTo('#switchTable_wrapper .col-md-6:eq(0)');
    });
    $(function () {
      $("#agentesTable").DataTable(customtableConfig).buttons().container().appendTo('#agentesTable_wrapper .col-md-6:eq(0)');
    });
    this.obtenerSwitches()
    this.obtenerAgentes()
  }

  obtenerAgentes() {
    this.agenteService.getAgentesFicticios().subscribe((agentes) => {
      this.agentesData = agentes;
    });

    // this.agenteService.getAgentes().subscribe((agentes) => {
    //   this.agentesData = agentes;
    // });
  }

  obtenerSwitches() {
    this.switchService.getSwitchesFicticios().subscribe((switchs) => {
      this.switchesData = switchs;
    });

    // this.switchService.getSwitches().subscribe((switchs) => {
    //   this.switchesData = switchs;
    // });
  }
}

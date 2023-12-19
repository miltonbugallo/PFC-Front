import { Component } from '@angular/core';
import { AgentesDispositivosService } from 'src/app/services/agentes-dispositivos.service';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-agentes-dispositivos',
  templateUrl: './agentes-dispositivos.component.html',
  styleUrls: ['./agentes-dispositivos.component.css']
})
export class AgentesDispositivosComponent {

  constructor(private datatableService: DataTableConfigService, private agentesDispositivosService: AgentesDispositivosService ) { }

  agentesDispositivosData:  any[] = [];


  ngOnInit() {
    this.obtenerDatos();
  }
  
  private initializeDataTable() {
      // Obtén la configuración base del servicio
      const baseDatatableConfig = this.datatableService.getDatatableConfig();
      // Define una configuración personalizada para la tabla de "Agentes Sin Equipo"
      const customConfig = {
        buttons: ["excel", "pdf", "print"], // Personaliza los botones según tus necesidades
      };
      // Fusiona la configuración base con la configuración personalizada
      const customtableConfig = Object.assign({}, baseDatatableConfig, customConfig);
    if ($.fn.DataTable.isDataTable("#agenteDispositivoTable")) {
      $("#agenteDispositivoTable").DataTable().destroy();
    }
    
    $(function () {
      $("#agenteDispositivoTable").DataTable(customtableConfig).buttons().container().appendTo('#agenteDispositivoTable_wrapper .col-md-6:eq(0)');
    });
  }

  obtenerDatos() {
    this.agentesDispositivosService.getData().subscribe((datos) => {
      this.agentesDispositivosData = datos.Relacion;
      this.initializeDataTable();
    });
  }
    
}


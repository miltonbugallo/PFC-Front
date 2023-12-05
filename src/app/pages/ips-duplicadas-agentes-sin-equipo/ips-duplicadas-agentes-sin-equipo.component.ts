import { Component } from '@angular/core';
import { DataTableConfigService } from '../../services/data-table-config.service';
import { IpsDuplicadasAgentesSinEquipoService } from 'src/app/services/ips-duplicadas-agentes-sin-equipo.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-ips-duplicadas-agentes-sin-equipo',
  templateUrl: './ips-duplicadas-agentes-sin-equipo.component.html',
  styleUrls: ['./ips-duplicadas-agentes-sin-equipo.component.css']
})
export class IpsDuplicadasAgentesSinEquipoComponent {

  constructor(private datatableService: DataTableConfigService, private ipsDuplicadasAgentesSinEquipoService: IpsDuplicadasAgentesSinEquipoService ) { }

  ipsDuplicadasData: any[] = [];
  agentesSinEquipoData:  any[] = [];


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
    if ($.fn.DataTable.isDataTable("#ipsDuplicadasTable")) {
      $("#ipsDuplicadasTable").DataTable().destroy();
    }
    if ($.fn.DataTable.isDataTable("#agentesSinEquipoTable")) {
      $("#agentesSinEquipoTable").DataTable().destroy();
    }
    
    $(function () {
      $("#agentesSinEquipoTable").DataTable(customtableConfig).buttons().container().appendTo('#agentesSinEquipoTable_wrapper .col-md-6:eq(0)');
      $("#ipsDuplicadasTable").DataTable(customtableConfig).buttons().container().appendTo('#ipsDuplicadasTable_wrapper .col-md-6:eq(0)');
    });
  }

  obtenerDatos() {
    this.ipsDuplicadasAgentesSinEquipoService.getData().subscribe((datos) => {
      this.ipsDuplicadasData = datos.ipsDuplicadas;
      this.agentesSinEquipoData = datos.agentesSinEquipo;
      this.initializeDataTable();
    });
  }
    
}

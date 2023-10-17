import { Component } from '@angular/core';
import { AgentesSinEquipoService } from '../../services/agentes-sin-equipo.service';
import { DataTableConfigService } from '../../services/data-table-config.service';
import { IpsDuplicadasService } from '../../services/ips-duplicadas.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-ips-duplicadas-agentes-sin-equipo',
  templateUrl: './ips-duplicadas-agentes-sin-equipo.component.html',
  styleUrls: ['./ips-duplicadas-agentes-sin-equipo.component.css']
})
export class IpsDuplicadasAgentesSinEquipoComponent {

  constructor(private datatableService: DataTableConfigService, private agentesSinEquipoService: AgentesSinEquipoService,
    private ipsDuplicadasService: IpsDuplicadasService) { }

  ipsDuplicadasData = this.ipsDuplicadasService.obtenerIpsDuplicadas()
  agentesSinEquipoData = this.agentesSinEquipoService.obtenerAgentesSinEquipo()

  ngOnInit() {

    // Obtén la configuración base del servicio
    const baseDatatableConfig = this.datatableService.getDatatableConfig();
    // Define una configuración personalizada para la tabla de "Agentes Sin Equipo"
    const customConfig = {
      buttons: ["excel", "pdf", "print"], // Personaliza los botones según tus necesidades
    };
    // Fusiona la configuración base con la configuración personalizada
    const customtableConfig = Object.assign({}, baseDatatableConfig, customConfig);

    // Inicializa la tabla de "Agentes Sin Equipo" con la nueva configuración
    $(function () {
      $("#agentesSinEquipoTable").DataTable(customtableConfig).buttons().container().appendTo('#agentesSinEquipoTable_wrapper .col-md-6:eq(0)');
      $("#ipsDuplicadasTable").DataTable(customtableConfig).buttons().container().appendTo('#ipsDuplicadasTable_wrapper .col-md-6:eq(0)');
    });
  }
}

import { Component } from '@angular/core';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-ips',
  templateUrl: './ips.component.html',
  styleUrls: ['./ips.component.css']
})
export class IpsComponent {

  constructor(private datatableService: DataTableConfigService) { }

    agentesSinEquipoData = [
      { id: "1", ip: '10.255.255', agente: 'Milton' },
      { id: "2", ip: '20.255.255', agente: 'Joaco'},
      { id: "3", ip: '30.255.255', agente: 'Miguel'},
    ];

    ipsData = [
      { id: "1", ip: '10.255.255', agentes: ['Milton', 'Joaquin'], dispositivos: ['Pc1', 'Pc2'], switches: [] },
      { id: "2", ip: '20.255.255', agentes: ['Marcos', 'Juan'], dispositivos: [], switches: [] },
      { id: "3", ip: '30.255.255', agentes: ['Agus'], dispositivos: ['Pc2'], switches: [] },
      
    ];

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    const datatableConfigWithoutColVis = Object.assign({}, datatableConfig, {
      buttons: ["excel", "pdf", "print"],
    });
    $(function () {
      $("#ipsTable").DataTable(datatableConfigWithoutColVis).buttons().container().appendTo('#ipsTable_wrapper .col-md-6:eq(0)');
      $("#agentesSinEquipoTable").DataTable(datatableConfigWithoutColVis).buttons().container().appendTo('#agentesSinEquipoTable_wrapper .col-md-6:eq(0)');
    });
  }

}

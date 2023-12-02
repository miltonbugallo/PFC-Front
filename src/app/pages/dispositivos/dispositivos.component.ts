import { Component } from '@angular/core';
import { dispositivoModel } from 'src/app/models/dispositivoModel';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { DispositivosService } from 'src/app/services/dispositivos.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.css']
})
export class DispositivosComponent {

  constructor(
    private datatableService: DataTableConfigService,
    private dispositivosService: DispositivosService
  ) { }

  public dispositivosData: dispositivoModel[] = []

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#dispositivosTable").DataTable(datatableConfig).buttons().container().appendTo('#dispositivosTable_wrapper .col-md-6:eq(0)');
    });
    this.obtenerDispositivos()
  }

  obtenerDispositivos() {
    this.dispositivosService.getEquipos()
      .subscribe((dispositivos: any) => {
        this.dispositivosData = dispositivos;
        const datatableConfig = this.datatableService.getDatatableConfig();
        $(function () {
          $("#dispositivosTable").DataTable(datatableConfig).buttons().container().appendTo('#dispositivosTable_wrapper .col-md-6:eq(0)');
        });
      });
  }

}

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
    this.dispositivosData = this.dispositivosService.obtenerDispositivos()
    // this.switchService.obtenerSwitch()
    //   .subscribe((switches: any) => {
    //     this.switchesData = switches;
    //   });
  }


  getClaseParaSistemaOperativo(sistemaOperativo: string): string {
    if (sistemaOperativo === 'Windows 10') {
      return 'correcto';
    } else if (sistemaOperativo === 'Linux 10') {
      return 'alerta';
    } else {
      return 'verificar';
    }
  }

  getClaseParaRAM(ram: number): string {
    if (ram >= 12) {
      return 'correcto';
    } else if (ram < 6) {
      return 'alerta';
    } else {
      return 'verificar';
    }
  }


  getClaseParaEstado(sistemaOperativo: string, ram: number): string {
    let clase = [];
  
    const sistemaOperativoClass = this.getClaseParaSistemaOperativo(sistemaOperativo);
    const ramClass = this.getClaseParaRAM(ram);
  
    if (sistemaOperativoClass === 'correcto' && ramClass === 'correcto') {
      clase.push('condicionCorrecto');
    } else if (sistemaOperativoClass === 'alerta' || ramClass === 'alerta') {
      clase.push('condicionAlerta');
    } else {
      clase.push('condicionVerificar');
    }
  
    return clase.join(' ');
  }

}

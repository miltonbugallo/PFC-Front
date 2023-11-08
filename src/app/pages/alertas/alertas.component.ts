import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertasService } from 'src/app/services/alertas.service';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit{

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog,
    private alertasService: AlertasService) { }

    alertasData = this.alertasService.obtenerAlertas()
  

  ngOnInit() {
    // Obtén la configuración base del servicio
    const baseDatatableConfig = this.datatableService.getDatatableConfig();
    // Define una configuración personalizada para la tabla de "Agentes Sin Equipo"
    const customConfig = {
      searching: false,
      ordering: false,
      buttons: [],
    };
    // Fusiona la configuración base con la configuración personalizada
    const customtableConfig = Object.assign({}, baseDatatableConfig, customConfig);

    $(function () {
      $("#alertasTable").DataTable(customtableConfig).buttons().container().appendTo('#alertasTable_wrapper .col-md-6:eq(0)');
    });
  }

}
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SwitchsFormComponent } from 'src/app/forms/switchs-form/switchs-form.component';
import { ConexionSwitch } from 'src/app/models/conexionSwitch';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { SwitchsService } from 'src/app/services/switchs.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-switchs',
  templateUrl: './switchs.component.html',
  styleUrls: ['./switchs.component.css']
})
export class SwitchsComponent implements OnInit {

  constructor(
    private datatableService: DataTableConfigService,
    private dialog: MatDialog,
    private dialogConfirm: MatDialog,
    private switchService: SwitchsService
  ) { }

  public switchesData: any[] = []
  conexionSwitch: any = ConexionSwitch

  ngOnInit() {
    this.obtenerSwitches();
  }
  
  obtenerSwitches() {
    this.switchService.getSwitch().subscribe((switchs) => {
      this.switchesData = switchs;
      this.initializeDataTable();
    });
  }
  
  private initializeDataTable() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    if ($.fn.DataTable.isDataTable("#switchTable")) {
      $("#switchTable").DataTable().destroy();
    }
    
    $(function () {
      $("#switchTable").DataTable(datatableConfig).buttons().container().appendTo('#switchTable_wrapper .col-md-6:eq(0)');
    });
  }

  crearSwitch(nuevoSwitch: any) {

    this.switchService.crearSwitch(nuevoSwitch).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la creación del switch correctamente')
        console.log('Switch creado:', respuesta);
        this.obtenerSwitches();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al crear el switch:', error);
      }
    );
  }

  actualizarSwitch(switchData: any) {
    this.switchService.actualizarSwitch(switchData).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la actualización del switch correctamente')
        console.log('Switch actualizado:', respuesta);
        this.obtenerSwitches();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al crear el switch:', error);
      }
    );
  }

  deleteSwitch(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400"
    dialogConfig.disableClose = true;
    dialogConfig.data = { mensaje: '¿Seguro que deseas eliminar este switch?' }
    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.switchService.eliminarSwitch(id).subscribe(
          (respuesta) => {
            this.openDialog(true, 'Se confirmó la eliminacón del switch correctamente')
            console.log('Switch eliminado:', respuesta)
            this.obtenerSwitches();
          },
          (error) => {
            this.openDialog(false, 'Error en el servidor. Intente nuevamente')
            console.error('Error al crear el switch:', error);
          }
        );
      }
    });
  }

  abrirFormulario(switchData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: switchData || null
    };

    const dialogRef = this.dialog.open(SwitchsFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        if (switchData) {
          this.actualizarSwitch(datosActualizados);

        } else {
          this.crearSwitch(datosActualizados);
        }
      }
    });
  }

  openDialog(success: boolean, message: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      boleanData: success,
      messageData: message
    }
    this.dialogConfirm.open(DialogMsgComponent, dialogConfig);
  }

}
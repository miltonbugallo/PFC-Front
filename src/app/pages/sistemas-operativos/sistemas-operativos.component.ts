import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SistemasOperativosFormComponent } from 'src/app/forms/sistemas-operativos-form/sistemas-operativos-form.component';
import { sistemaOperativoModel } from 'src/app/models/sistemaOperativoModel';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { SistemasOperativosService } from 'src/app/services/sistemas-operativos.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-sistemas-operativos',
  templateUrl: './sistemas-operativos.component.html',
  styleUrls: ['./sistemas-operativos.component.css']
})
export class SistemasOperativosComponent {
  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog, private dialogConfirm: MatDialog,
    private sistemasOperativosService: SistemasOperativosService) { }

  sosData: sistemaOperativoModel[] = []

  ngOnInit() {
    this.obtenerSO();
  }
  
  obtenerSO() {
    this.sistemasOperativosService.getSO().subscribe((sos) => {
      this.sosData = sos;
      this.initializeDataTable();
    });
  }
  
  private initializeDataTable() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    if ($.fn.DataTable.isDataTable("#soTable")) {
      $("#soTable").DataTable().destroy();
    }
    
    $(function () {
      $("#soTable").DataTable(datatableConfig).buttons().container().appendTo('#soTable_wrapper .col-md-6:eq(0)');
    });
  }


  deleteSO(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400"
    dialogConfig.disableClose = true;
    dialogConfig.data = { mensaje: '¿Seguro que deseas eliminar este sistema operativo?' }
    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sistemasOperativosService.eliminarSO(id).subscribe(
          (respuesta) => {
            console.log('SO eliminado:', respuesta);
            this.openDialog(true, 'Se confirmó la eliminacón del sistema operativo correctamente')
            this.obtenerSO();
          },
          (error) => {
            this.openDialog(false, 'Error en el servidor. Intente nuevamente')
            console.error('Error al eliminar el so:', error);
          }
        );
      }
    });
  }

  abrirFormulario(soData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: soData || null
    };

    const dialogRef = this.dialog.open(SistemasOperativosFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        if (soData) {
          this.actualizarSO(datosActualizados);
        } else {
          this.agregarNuevoSO(datosActualizados);
        }
      }
    });
  }

  actualizarSO(so: any) {
    this.sistemasOperativosService.actualizarSO(so).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la actualización del sistema operativo correctamente')
        console.log('SO actualizado:', respuesta);
        this.obtenerSO();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al actualizar el so:', error);
      }
    );
  }

  agregarNuevoSO(nuevoSO: any) {
    this.sistemasOperativosService.crearSO(nuevoSO).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la creación del sistema operativo correctamente')
        console.log('SO creado:', respuesta);
        this.obtenerSO();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al crear el so:', error);
      }
    );
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


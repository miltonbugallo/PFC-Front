import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SectoresFormComponent } from 'src/app/forms/sectores-form/sectores-form.component';
import { sectorModel } from 'src/app/models/sectorModel';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { SectoresService } from 'src/app/services/sectores.service';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.css']
})
export class SectoresComponent {

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog, private dialogConfirm: MatDialog,
    private sectoresService: SectoresService) { }

  sectoresData: sectorModel[] = []

  ngOnInit() {
    this.obtenerSectores();
  }
  
  obtenerSectores() {
    this.sectoresService.getSectores().subscribe((sectores) => {
      this.sectoresData = sectores;
      this.initializeDataTable();
    });
  }
  
  private initializeDataTable() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    if ($.fn.DataTable.isDataTable("#sectoresTable")) {
      $("#sectoresTable").DataTable().destroy();
    }
    
    $(function () {
      $("#sectoresTable").DataTable(datatableConfig).buttons().container().appendTo('#sectoresTable_wrapper .col-md-6:eq(0)');
    });
  }

  crearSector(nuevoSector: any) {

    this.sectoresService.crearSector(nuevoSector).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la creación del sector correctamente')
        console.log('Sector creado:', respuesta);
        this.obtenerSectores();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al crear el sector:', error);

      }
    );
  }

  actualizarSector(sector: any) {
    this.sectoresService.actualizarSector(sector).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la actualización del sector correctamente')
        console.log('Sector creado:', respuesta);
        this.obtenerSectores();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al actualizar el sector:', error);

      }
    );
  }

  deleteSector(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400"
    dialogConfig.disableClose = true;
    dialogConfig.data = { mensaje: '¿Seguro que deseas eliminar este sector?' }
    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sectoresService.eliminarSector(id).subscribe(
          (respuesta) => {
            console.log('Sector eliminado:', respuesta);
            this.openDialog(true, 'Se confirmó la eliminacón del sector correctamente')
            this.obtenerSectores();
          },
          (error) => {
            this.openDialog(false, 'Error en el servidor. Intente nuevamente')
            console.error('Error al eliminar el sector:', error);
          }
        );
      }
    });
  }

  // Función para abrir el formulario de edición/agregado en un modal
  abrirFormulario(sectorData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: sectorData || null // Pasamos null cuando no hay datos para editar
    };

    const dialogRef = this.dialog.open(SectoresFormComponent, dialogConfig);

    // Suscríbete al evento 'afterClosed' del modal para obtener los datos del formulario al cerrarse
    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo sector
        if (sectorData) {
          // Se editó un sector existente
          this.actualizarSector(datosActualizados); // Lógica para guardar los cambios

        } else {
          // Se agregó un nuevo sector
          this.crearSector(datosActualizados); // Lógica para agregar el nuevo sector
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

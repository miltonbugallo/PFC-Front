import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgentesFormComponent } from 'src/app/forms/agentes-form/agentes-form.component';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { AgentesService } from '../../services/agentes.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.css']
})
export class AgentesComponent implements OnInit {

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog, private dialogConfirm: MatDialog,
    private agenteService: AgentesService) { }

  agentesData: any[] = []

  ngOnInit() {
    this.obtenerAgentes();
  }
  
  obtenerAgentes() {
    this.agenteService.getAgentes().subscribe((agentes) => {
      this.agentesData = agentes;
      this.initializeDataTable();
    });
  }
  
  private initializeDataTable() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    if ($.fn.DataTable.isDataTable("#agentesTable")) {
      $("#agentesTable").DataTable().destroy();
    }
    
    $(function () {
      $("#agentesTable").DataTable(datatableConfig).buttons().container().appendTo('#agentesTable_wrapper .col-md-6:eq(0)');
    });
  }

  crearAgente(nuevoAgente: any) {
    this.agenteService.crearAgente(nuevoAgente).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la creación del agente correctamente')
        console.log('Agente creado:', respuesta);
        this.obtenerAgentes();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al crear el agente:', error);
      }
    );
  }

  actualizarAgente(agente: any) {

    this.agenteService.actualizarAgente(agente).subscribe(
      (respuesta) => {
        this.openDialog(true, 'Se confirmó la actualización del agente correctamente')
        console.log('Agente actualizado:', respuesta);
        this.obtenerAgentes();
      },
      (error) => {
        this.openDialog(false, 'Error en el servidor. Intente nuevamente')
        console.error('Error al actualizar el agente:', error);
        // Puedes manejar el error aquí, mostrar un mensaje al usuario, realizar acciones específicas, etc.
      }
    );
  }

  eliminarAgente(id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400"
    dialogConfig.disableClose = true;
    dialogConfig.data = { mensaje: '¿Seguro que deseas eliminar este agente?' }
    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.agenteService.eliminarAgente(id).subscribe(
          (respuesta) => {
            console.log('Agente eliminado:', respuesta);
            this.openDialog(true, 'Se confirmó la eliminacón del agente correctamente')
            this.obtenerAgentes();
          },
          (error) => {
            this.openDialog(false, 'Error en el servidor. Intente nuevamente')
            console.error('Error al eliminar el agente:', error);
          }
        );
      }
    });
  }

  // Función para abrir el formulario de edición/agregado en un modal
  abrirFormulario(agenteData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: agenteData || null // Pasamos null cuando no hay datos para editar
    };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AgentesFormComponent, dialogConfig);

    // Suscríbete al evento 'afterClosed' del modal para obtener los datos del formulario al cerrarse
    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo agente
        if (agenteData) {
          // Se editó un agente existente
          this.actualizarAgente(datosActualizados); // Lógica para guardar los cambios

        } else {
          // Se agregó un nuevo agente
          this.crearAgente(datosActualizados); // Lógica para agregar el nuevo agente
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
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SwitchsFormComponent } from 'src/app/forms/switchs-form/switchs-form.component';
import { ConexionSwitch } from 'src/app/models/conexionSwitch';
import { switchModel } from 'src/app/models/switchModel';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { SwitchsService } from 'src/app/services/switchs.service';
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
    private switchService: SwitchsService
  ) { }

  public switchesData: any[] = []
  conexionSwitch: any = ConexionSwitch

  ngOnInit() {
    this.obtenerSwitches()
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#switchTable").DataTable(datatableConfig).buttons().container().appendTo('#switchTable_wrapper .col-md-6:eq(0)');
    });
  }

  obtenerSwitches() {
    this.switchService.getSwitch().subscribe((switchs) => {
      this.switchesData = switchs;
    });
  }

  crearSwitch(nuevoSwitch: any) {

    this.switchService.crearSwitch(nuevoSwitch).subscribe((respuesta) => {
      console.log('Switch creado:', respuesta);
      // Puedes realizar acciones después de crear el agente
      this.obtenerSwitches(); // Por ejemplo, actualizar la lista de agentes después de crear uno nuevo
    });
  }

  actualizarSwitch(switchData: any) {
    this.switchService.actualizarSwitch(switchData).subscribe((respuesta) => {
      console.log('Switch actualizado:', respuesta);
      // Puedes realizar acciones después de actualizar el agente
      this.obtenerSwitches(); // Por ejemplo, actualizar la lista de agentes después de la actualización
    });
  }

  deleteSwitch(id: number) {
    this.switchService.eliminarSwitch(id).subscribe((respuesta) => {
      console.log('Switch eliminado:', respuesta);
      // Puedes realizar acciones después de eliminar el agente
      this.obtenerSwitches(); // Por ejemplo, actualizar la lista de agentes después de la eliminación
    });
  }

  // Función para abrir el formulario de edición/agregado en un modal
  abrirFormulario(switchData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: switchData || null // Pasamos null cuando no hay datos para editar
    };

    const dialogRef = this.dialog.open(SwitchsFormComponent, dialogConfig);

    // Suscríbete al evento 'afterClosed' del modal para obtener los datos del formulario al cerrarse
    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo Switch
        if (switchData) {
            // Se editó un Switch existente
          this.actualizarSwitch(datosActualizados); // Lógica para guardar los cambios
          
        } else {
          // Se agregó un nuevo Switch
          this.crearSwitch(datosActualizados); // Lógica para agregar el nuevo Switch
        }
      }
    });
  }

  
}
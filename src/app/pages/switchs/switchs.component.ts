import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SwitchsFormComponent } from 'src/app/forms/switchs-form/switchs-form.component';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { SwitchsService } from 'src/app/services/switchs.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-switchs',
  templateUrl: './switchs.component.html',
  styleUrls: ['./switchs.component.css']
})
export class SwitchsComponent implements OnInit {

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog,
    private switchService: SwitchsService) { }

  switchesData = this.switchService.obtenerSwitchs()

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#switchTable").DataTable(datatableConfig).buttons().container().appendTo('#switchTable_wrapper .col-md-6:eq(0)');
    });
  }

  deleteSwitch(switchData: any) {
    // Encuentra el índice del elemento en el array switchesData y elimínalo
    const index = this.switchesData.indexOf(switchData);
    if (index !== -1) {
      this.switchesData.splice(index, 1);
    }
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
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo switch
        if (switchData) {
          // Se editó un switch existente
          this.guardarCambios(datosActualizados); // Lógica para guardar los cambios
        } else {
          // Se agregó un nuevo switch
          this.agregarNuevoSwitch(datosActualizados); // Lógica para agregar el nuevo switch
        }
      }
    });
  }

  guardarCambios(datosActualizados: any) {
    // Lógica para guardar los cambios en el backend o actualizar los datos originales
    const index = this.switchesData.findIndex((data) => data.ID === datosActualizados.ID);
    if (index !== -1) {
      this.switchesData[index] = datosActualizados;
    }
  }

  agregarNuevoSwitch(nuevoSwitch: any) {
    // Lógica para agregar el nuevo switch al array switchesData
    this.switchesData.push(nuevoSwitch)
  }

}
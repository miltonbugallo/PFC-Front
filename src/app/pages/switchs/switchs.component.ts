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

  public switchesData: switchModel[] = []
  conexionSwitch: any = ConexionSwitch

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#switchTable").DataTable(datatableConfig).buttons().container().appendTo('#switchTable_wrapper .col-md-6:eq(0)');
    });
    this.obtenerSwitches()
  }

  obtenerSwitches() {
    this.switchesData = this.switchService.obtenerSwitchs()
    // this.switchService.obtenerSwitch()
    //   .subscribe((switches: any) => {
    //     this.switchesData = switches;
    //   });
  }

  deleteSwitch(switchData: any) {
    // Encuentra el índice del elemento en el array switchesData y elimínalo
    const index = this.switchesData.indexOf(switchData);
    if (index !== -1) {
      this.switchesData.splice(index, 1);
    }

    // this.switchService.deleteSwitch(switchDelete)
    //   .subscribe(result => {
    //     if (result) {
    //       console.log('Switch editado exitosamente.');
    //       this.switchesData = this.switchService.obtenerSwitchs()

    //     } else {
    //       console.error('Error al editar el switch.');
    //     }
    //   });

  }

  // Función para abrir el formulario de edición/agregado en un modal
  abrirFormulario(switchData?: switchModel) {
    const dialogConfig: MatDialogConfig = {
      data: switchData || null // Pasamos null cuando no hay datos para editar
    };

    const dialogRef = this.dialog.open(SwitchsFormComponent, dialogConfig);

    // Suscríbete al evento 'afterClosed' del modal para obtener los datos del formulario al cerrarse
    dialogRef.afterClosed().subscribe((datosActualizados: switchModel) => {
      if (datosActualizados) {
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo switch
        if (switchData) {
          // Se editó un switch existente
          this.editarSwitch(datosActualizados); // Lógica para guardar los cambios
        } else {
          // Se agregó un nuevo switch
          this.agregarNuevoSwitch(datosActualizados); // Lógica para agregar el nuevo switch
        }
      }
    });
  }

  editarSwitch(switchEditado: switchModel) {
    // Lógica para guardar los cambios en el backend o actualizar los datos originales
    const index = this.switchesData.findIndex((data) => data.id === switchEditado.id);
    if (index !== -1) {
      this.switchesData[index] = switchEditado;
    }
    // this.switchService.editarSwitch(switchEditado)
    //   .subscribe(result => {
    //     if (result) {
    //       console.log('Switch editado exitosamente.');
    //       this.switchesData = this.switchService.obtenerSwitchs()

    //     } else {
    //       console.error('Error al editar el switch.');
    //     }
    //   });

  }

  agregarNuevoSwitch(nuevoSwitch: switchModel) {
    // Lógica para agregar el nuevo switch al array switchesData
    this.switchesData.push(nuevoSwitch)

    // this.switchService.agregarSwitch(nuevoSwitch)
    //   .subscribe(result => {
    //     if (result) {
    //       console.log('Switch agregado exitosamente.');
    //          this.switchesData = this.switchService.obtenerSwitchs()
    //     } else {
    //       console.error('Error al agregar el switch.');
    //     }
    //   });

  }

}
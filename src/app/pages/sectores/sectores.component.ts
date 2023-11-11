import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SectoresFormComponent } from 'src/app/forms/sectores-form/sectores-form.component';
import { sectorModel } from 'src/app/models/sectorModel';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { SectoresService } from 'src/app/services/sectores.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.css']
})
export class SectoresComponent {

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog,
    private sectoresService: SectoresService) { }

  sectoresData: sectorModel[] = []
  //this.sectoresService.getSectores()

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#sectoresTable").DataTable(datatableConfig).buttons().container().appendTo('#sectoresTable_wrapper .col-md-6:eq(0)');
    });
  }

  deleteSector(sectorData: any) {
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
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo switch
        if (sectorData) {
          // Se editó un switch existente
          this.guardarCambios(datosActualizados); // Lógica para guardar los cambios
        } else {
          // Se agregó un nuevo switch
          this.agregarNuevoSector(datosActualizados); // Lógica para agregar el nuevo switch
        }
      }
    });
  }

  guardarCambios(datosActualizados: sectorModel) {
    
  }

  agregarNuevoSector(nuevoSector: any) {
    
  }

}

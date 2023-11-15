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

  ngOnInit() {
    this.obtenerSectores();
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#sectoresTable").DataTable(datatableConfig).buttons().container().appendTo('#sectoresTable_wrapper .col-md-6:eq(0)');
    });
  }

  obtenerSectores() {
  this.sectoresService.getSectores().subscribe((sectores) => {
    this.sectoresData = sectores;
  });
}

crearSector(nuevoSector: any) {

  this.sectoresService.crearSector(nuevoSector).subscribe((respuesta) => {
    console.log('Sector creado:', respuesta);
    // Puedes realizar acciones después de crear el agente
    this.obtenerSectores(); // Por ejemplo, actualizar la lista de agentes después de crear uno nuevo
  });
}

actualizarSector(sector: any) {
  this.sectoresService.actualizarSector(sector).subscribe((respuesta) => {
    console.log('Sector actualizado:', respuesta);
    // Puedes realizar acciones después de actualizar el agente
    this.obtenerSectores(); // Por ejemplo, actualizar la lista de agentes después de la actualización
  });
}

deleteSector(id: number) {
  this.sectoresService.eliminarSector(id).subscribe((respuesta) => {
    console.log('Sector eliminado:', respuesta);
    // Puedes realizar acciones después de eliminar el agente
    this.obtenerSectores(); // Por ejemplo, actualizar la lista de agentes después de la eliminación
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

}

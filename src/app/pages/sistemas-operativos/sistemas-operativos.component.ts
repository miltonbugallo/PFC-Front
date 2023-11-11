import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SistemasOperativosFormComponent } from 'src/app/forms/sistemas-operativos-form/sistemas-operativos-form.component';
import { sistemaOperativoModel } from 'src/app/models/sistemaOperativoModel';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { SistemasOperativosService } from 'src/app/services/sistemas-operativos.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-sistemas-operativos',
  templateUrl: './sistemas-operativos.component.html',
  styleUrls: ['./sistemas-operativos.component.css']
})
export class SistemasOperativosComponent {
  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog,
    private sistemasOperativosService: SistemasOperativosService) { }

  sosData: sistemaOperativoModel[] = []
  //this.sistemasOperativosService.getSistemasOperativos()

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#soTable").DataTable(datatableConfig).buttons().container().appendTo('#soTable_wrapper .col-md-6:eq(0)');
    });
  }

  deleteSO(soData: any) {
  }

  // Función para abrir el formulario de edición/agregado en un modal
  abrirFormulario(soData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: soData || null // Pasamos null cuando no hay datos para editar
    };

    const dialogRef = this.dialog.open(SistemasOperativosFormComponent, dialogConfig);

    // Suscríbete al evento 'afterClosed' del modal para obtener los datos del formulario al cerrarse
    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo so
        if (soData) {
          // Se editó un so existente
          this.guardarCambios(datosActualizados); // Lógica para guardar los cambios
        } else {
          // Se agregó un nuevo so
          this.agregarNuevoSO(datosActualizados); // Lógica para agregar el nuevo so
        }
      }
    });
  }

  guardarCambios(datosActualizados: sistemaOperativoModel) {
    
  }

  agregarNuevoSO(nuevoSO: any) {
    
  }

}


import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgentesFormComponent } from 'src/app/forms/agentes-form/agentes-form.component';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { AgentesService } from '../../services/agentes.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.css']
})
export class AgentesComponent implements OnInit{

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog,
    private agenteService: AgentesService) { }

  agentesData = this.agenteService.obtenerAgentes()

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#agentesTable").DataTable(datatableConfig).buttons().container().appendTo('#agentesTable_wrapper .col-md-6:eq(0)');
    });
  }

  deleteAgente(agenteData: any) {
    // Encuentra el índice del elemento en el array agentesData y elimínalo
    const index = this.agentesData.indexOf(agenteData);
    if (index !== -1) {
      this.agentesData.splice(index, 1);
    }
  }

  // Función para abrir el formulario de edición/agregado en un modal
  abrirFormulario(agenteData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: agenteData || null // Pasamos null cuando no hay datos para editar
    };

    const dialogRef = this.dialog.open(AgentesFormComponent, dialogConfig);

    // Suscríbete al evento 'afterClosed' del modal para obtener los datos del formulario al cerrarse
    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo switch
        if (agenteData) {
          // Se editó un switch existente
          this.guardarCambios(datosActualizados); // Lógica para guardar los cambios
        } else {
          // Se agregó un nuevo switch
          this.agregarNuevoAgente(datosActualizados); // Lógica para agregar el nuevo switch
        }
      }
    });
  }

  guardarCambios(datosActualizados: any) {
    // Lógica para guardar los cambios en el backend o actualizar los datos originales
    const index = this.agentesData.findIndex((data) => data.id === datosActualizados.id);
    if (index !== -1) {
      this.agentesData[index] = datosActualizados;
    }
  }

  agregarNuevoAgente(nuevoAgente: any) {
    // Lógica para agregar el nuevo switch al array switchesData
    this.agentesData.push(nuevoAgente)
  }

}
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgentesFormComponent } from 'src/app/forms/agentes-form/agentes-form.component';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.css']
})
export class AgentesComponent implements OnInit{

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog) { }

  agentesData = [
    { ID: "1", IP: '10.255.255', Nombre: 'Milton', Rol: 'Usuario', Ubicacion: 'Secretaria', EstadoIP: 'Asignada' },
    { ID: "2", IP: '20.255.255', Nombre: 'Joaco', Rol: 'Usuario', Ubicacion: 'IT', EstadoIP: 'Asignada' },
    { ID: "3", IP: '30.255.255', Nombre: 'Miguel', Rol: 'Usuario', Ubicacion: 'Ministerio', EstadoIP: 'Asignada' },
  ];

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
    const index = this.agentesData.findIndex((data) => data.ID === datosActualizados.ID);
    if (index !== -1) {
      this.agentesData[index] = datosActualizados;
    }
  }

  agregarNuevoAgente(nuevoAgente: any) {
    // Lógica para agregar el nuevo switch al array switchesData
    this.agentesData.push(nuevoAgente)
  }

}
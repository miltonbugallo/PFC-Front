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

  agentesData:any[] = []
  

  ngOnInit() {
    this.obtenerAgentes()
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#agentesTable").DataTable(datatableConfig).buttons().container().appendTo('#agentesTable_wrapper .col-md-6:eq(0)');
    });
  }

  obtenerAgentes() {
    this.agenteService.getAgentesFicticios().subscribe((agentes) => {
      this.agentesData = agentes;
    });

    // this.agenteService.getAgentes().subscribe((agentes) => {
    //   this.agentesData = agentes;
    // });
  }

  crearAgente(nuevoAgente: any) {

    this.agenteService.crearAgente(nuevoAgente).subscribe((respuesta) => {
      console.log('Agente creado:', respuesta);
      // Puedes realizar acciones después de crear el agente
      this.obtenerAgentes(); // Por ejemplo, actualizar la lista de agentes después de crear uno nuevo
    });
  }

  actualizarAgente(agente: any) {
    this.agenteService.actualizarAgente(agente).subscribe((respuesta) => {
      console.log('Agente actualizado:', respuesta);
      // Puedes realizar acciones después de actualizar el agente
      this.obtenerAgentes(); // Por ejemplo, actualizar la lista de agentes después de la actualización
    });
  }

  eliminarAgente(id: number) {
    this.agenteService.eliminarAgente(id).subscribe((respuesta) => {
      console.log('Agente eliminado:', respuesta);
      // Puedes realizar acciones después de eliminar el agente
      this.obtenerAgentes(); // Por ejemplo, actualizar la lista de agentes después de la eliminación
    });
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

  
}
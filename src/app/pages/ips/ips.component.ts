import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgentesFormComponent } from 'src/app/forms/agentes-form/agentes-form.component';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { AgentesService } from '../../services/agentes.service';
import { IpsService } from 'src/app/services/ips.service';
import { IpsFormComponent } from 'src/app/forms/ips-form/ips-form.component';
import { ipModel } from 'src/app/models/ipModel';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-ips',
  templateUrl: './ips.component.html',
  styleUrls: ['./ips.component.css']
})
export class IpsComponent implements OnInit{

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog,
    private ipsService: IpsService) { }

  ipsData = this.ipsService.obtenerIps()

  ngOnInit() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#ipsTable").DataTable(datatableConfig).buttons().container().appendTo('#ipsTable_wrapper .col-md-6:eq(0)');
    });
  }

  deleteIp(ipData: any) {
    // Encuentra el índice del elemento en el array agentesData y elimínalo
    const index = this.ipsData.indexOf(ipData);
    if (index !== -1) {
      this.ipsData.splice(index, 1);
    }
  }

  // Función para abrir el formulario de edición/agregado en un modal
  abrirFormulario(ipData?: any) {
    const dialogConfig: MatDialogConfig = {
      data: ipData || null // Pasamos null cuando no hay datos para editar
    };

    const dialogRef = this.dialog.open(IpsFormComponent, dialogConfig);

    // Suscríbete al evento 'afterClosed' del modal para obtener los datos del formulario al cerrarse
    dialogRef.afterClosed().subscribe((datosActualizados: any) => {
      if (datosActualizados) {
        // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo switch
        if (ipData) {
          // Se editó un switch existente
          this.guardarCambios(datosActualizados); // Lógica para guardar los cambios
        } else {
          // Se agregó un nuevo switch
          this.agregarNuevaIp(datosActualizados); // Lógica para agregar el nuevo switch
        }
      }
    });
  }

  guardarCambios(datosActualizados: ipModel) {
    // Lógica para guardar los cambios en el backend o actualizar los datos originales
    const index = this.ipsData.findIndex((data) => data.id === datosActualizados.id);
    if (index !== -1) {
      this.ipsData[index] = datosActualizados;
    }
  }

  agregarNuevaIp(nuevaIp: any) {
    // Lógica para agregar el nuevo switch al array switchesData
    this.ipsData.push(nuevaIp)
  }

}
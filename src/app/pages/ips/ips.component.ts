import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { IpsService } from 'src/app/services/ips.service';
import { IpsFormComponent } from 'src/app/forms/ips-form/ips-form.component';
import { ipAddressModel } from 'src/app/models/ipAddressModel';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-ips',
  templateUrl: './ips.component.html',
  styleUrls: ['./ips.component.css']
})
export class IpsComponent implements OnInit{

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog,
    private ipsService: IpsService) { }

  ipsData: ipAddressModel[] = [];

  ngOnInit() {
    this.obtenerIps();
    const datatableConfig = this.datatableService.getDatatableConfig();
    $(function () {
      $("#ipsTable").DataTable(datatableConfig).buttons().container().appendTo('#ipsTable_wrapper .col-md-6:eq(0)');
    });
  }

  obtenerIps() {
  this.ipsService.getIps().subscribe((ips) => {
    this.ipsData = ips;
  });
}

crearIp(nuevaIp: any) {

  this.ipsService.crearIp(nuevaIp).subscribe((respuesta) => {
    console.log('Ip creado:', respuesta);
    // Puedes realizar acciones después de crear el agente
    this.obtenerIps(); // Por ejemplo, actualizar la lista de agentes después de crear uno nuevo
  });
}

actualizarIp(ip: any) {
  this.ipsService.actualizarIp(ip).subscribe((respuesta) => {
    console.log('Ip actualizado:', respuesta);
    // Puedes realizar acciones después de actualizar el agente
    this.obtenerIps(); // Por ejemplo, actualizar la lista de agentes después de la actualización
  });
}

deleteIp(id: number) {
  this.ipsService.eliminarIp(id).subscribe((respuesta) => {
    console.log('Ip eliminado:', respuesta);
    // Puedes realizar acciones después de eliminar el agente
    this.obtenerIps(); // Por ejemplo, actualizar la lista de agentes después de la eliminación
  });
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
      // Si datosActualizados es true, significa que se han guardado los cambios o agregado un nuevo sector
      if (ipData) {
          // Se editó un sector existente
        this.actualizarIp(datosActualizados); // Lógica para guardar los cambios
        
      } else {
        // Se agregó un nuevo sector
        this.crearIp(datosActualizados); // Lógica para agregar el nuevo sector
      }
    }
  });
}

}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableConfigService } from 'src/app/services/data-table-config.service';
import { IpsService } from 'src/app/services/ips.service';
import { IpsFormComponent } from 'src/app/forms/ips-form/ips-form.component';
import { ipAddressModel } from 'src/app/models/ipAddressModel';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-ips',
  templateUrl: './ips.component.html',
  styleUrls: ['./ips.component.css']
})
export class IpsComponent implements OnInit{

  constructor(private datatableService: DataTableConfigService, private dialog: MatDialog, private dialogConfirm: MatDialog,
    private ipsService: IpsService) { }

  ipsData: ipAddressModel[] = [];

  ngOnInit() {
    this.obtenerIps();
  }
  
  obtenerIps() {
    this.ipsService.getIps().subscribe((ips) => {
      this.ipsData = ips;
      this.initializeDataTable();
    });
  }
  
  private initializeDataTable() {
    const datatableConfig = this.datatableService.getDatatableConfig();
    if ($.fn.DataTable.isDataTable("#ipsTable")) {
      $("#ipsTable").DataTable().destroy();
    }
    
    $(function () {
      $("#ipsTable").DataTable(datatableConfig).buttons().container().appendTo('#ipsTable_wrapper .col-md-6:eq(0)');
    });
  }


crearIp(nuevaIp: any) {

  this.ipsService.crearIp(nuevaIp).subscribe(
    (respuesta) => {
    this.openDialog(true, 'Se confirmó la creación de la IP correctamente')
    console.log('Ip creado:', respuesta);
    this.obtenerIps(); 
    },
    (error) => {
      this.openDialog(false, 'Error en el servidor. Intente nuevamente')
      console.error('Error al crear ip:', error);
    }
  );
}

actualizarIp(ip: any) {
  this.ipsService.actualizarIp(ip).subscribe(
    (respuesta) => {
    this.openDialog(true, 'Se confirmó la actualización de la IP correctamente')
    console.log('Ip actualizado:', respuesta);
    this.obtenerIps();
    },
    (error) => {
      this.openDialog(false, 'Error en el servidor. Intente nuevamente')
      console.error('Error al actualizar ip:', error);
    }
  );
}

deleteIp(id: number) {
  const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400"
    dialogConfig.disableClose = true;
    dialogConfig.data = {mensaje: '¿Seguro que deseas eliminar esta IP?' }
    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ipsService.eliminarIp(id).subscribe(
          (respuesta) => {
          console.log('IP eliminado:', respuesta);
          this.openDialog(true, 'Se confirmó la eliminacón de la IP correctamente')
          this.obtenerIps();
        },
          (error) => {
            this.openDialog(false, 'Error en el servidor. Intente nuevamente')
            console.error('Error al eliminar el ip:', error);
          }
        );
      }
      });
}

abrirFormulario(ipData?: any) {
  const dialogConfig: MatDialogConfig = {
    data: ipData || null
  };

  const dialogRef = this.dialog.open(IpsFormComponent, dialogConfig);

  
  dialogRef.afterClosed().subscribe((datosActualizados: any) => {
    if (datosActualizados) {
      if (ipData) {
        this.actualizarIp(datosActualizados); 
      } 
      else {
        this.crearIp(datosActualizados);
      }
    }
  });
}

openDialog(success: boolean, message: string) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.data = {
    boleanData: success,
    messageData: message
  }
  this.dialogConfirm.open(DialogMsgComponent,dialogConfig);
}

}

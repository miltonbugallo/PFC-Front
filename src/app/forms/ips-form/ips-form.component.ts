import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwitchsService } from 'src/app/services/switchs.service';
import { AgentesService } from 'src/app/services/agentes.service';
import { ipAddressModel } from 'src/app/models/ipAddressModel';
import { DispositivosService } from 'src/app/services/dispositivos.service';
import { DialogConfirmComponent } from 'src/app/pages/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-ips-form',
  templateUrl: './ips-form.component.html',
  styleUrls: ['./ips-form.component.css']
})
export class IpsFormComponent {

  editar: boolean = false;
  ipsForm: FormGroup;
  originalData: any;
  titulo = "Agregar ip";

  constructor(
    public dialogRef: MatDialogRef<IpsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public ipData: any,
    private fb: FormBuilder, private dialog: MatDialog, public agentesService: AgentesService, public switchService: SwitchsService, public equipoService: DispositivosService,
  ) {
    this.originalData = { ...ipData };
    this.ipsForm = this.fb.group({
      direccion: ['', Validators.required],
      agenteIp: [{ value: '', disabled: true }],
      switchIp: [{ value: '', disabled: true }],
      equipo: [{ value: '', disabled: true }],
    });
    if (this.ipData != null) {
      this.esEditar();
    }
    else {
      this.ipData = { id: null, ip: '', agente: { nombre: '', apellido: '' }, switch: { etiqueta: '' }, equipo: { nombre: '' } }
    }
  }

  esEditar() {
    this.editar = true;
    this.titulo = "Editar ip";
    this.ipsForm.patchValue({
      id: this.ipData.id,
      direccion: this.ipData.direccion,
      agenteIp: this.ipData.agente.id != -1 ? this.ipData.agente.nombre + ' ' + this.ipData.agente.apellido : '',
      switchIp: this.ipData.switches.id != -1 ? this.ipData.switches.etiqueta : '',
      equipo: this.ipData.equipo.id != -1 ? this.ipData.equipo.nombreDispositivo : '',
    });
  }


  guardarCambios() {
    if (this.ipsForm.valid) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "400"
      dialogConfig.disableClose = true;
      dialogConfig.data = { mensaje: '¿Seguro que deseas guardar estos datos?' }
      const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const ipActualizada: ipAddressModel = {
            id: this.ipData.id,
            direccion: this.ipsForm.get('direccion')?.value,
            agente: this.ipsForm.get('agenteIp')?.value === '' ? null : this.ipData.agente.id,
            switches: this.ipsForm.get('switchIp')?.value === '' ? null : this.ipData.switches.id,
            equipo: this.ipsForm.get('equipo')?.value === '' ? null : this.ipData.equipo.id,
          };
          this.dialogRef.close(ipActualizada);
        }
      });
    }
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }
}

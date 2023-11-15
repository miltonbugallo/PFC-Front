import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwitchsService } from 'src/app/services/switchs.service';
import { AgentesService } from 'src/app/services/agentes.service';
import { ipAddressModel } from 'src/app/models/ipAddressModel';
import { DispositivosService } from 'src/app/services/dispositivos.service';

@Component({
  selector: 'app-ips-form',
  templateUrl: './ips-form.component.html',
  styleUrls: ['./ips-form.component.css']
})
export class IpsFormComponent {
  ipsForm: FormGroup;
  originalData: any;
  titulo = "Agregar ip";
  agentes: any[] = [];
  switchs: any[] = [];
  equipos: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<IpsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public ipData: any,
    private fb: FormBuilder, public agentesService: AgentesService, public switchService: SwitchsService, public equipoService: DispositivosService,
  ) {
    this.originalData = { ...ipData };
    this.ipsForm = this.fb.group({
      id: ['', Validators.required],
      direccion: ['', Validators.required],
      agenteIp: [''],
      switch: [''],
      equipo: [''],
    });
    if(this.ipData != null){
      this.esEditar();
    }
    else {
      this.ipData = {id: '', ip: '', agente: {nombre:'', apellido:''}, switch: {nombre:''}, equipo: {nombre: ''}} 
    }
  }

  obtenerAgentes(){
    this.agentesService.getAgentes().subscribe((agentes) => {
      this.agentes = agentes;
    });
  }

  obtenerSwtichs() {
    this.switchService.getSwitch().subscribe((switchs) => {
      this.switchs = switchs;
    });
  }

  obtenerEquipos() {
    this.equipoService.getEquipos().subscribe((equipos) => {
      this.equipos = equipos;
    });
  }

  esEditar(){
    this.titulo = "Editar ip";
    this.ipsForm.patchValue({
      id: this.ipData.id,
      direccion: this.ipData.ip,
      agenteIp: this.ipData.agente.id != -1 ? this.ipData.agente.id : '',
      switch: this.ipData.switch.id != -1 ? this.ipData.switch.id : '',
      equipo: this.ipData.equipo.id != -1 ? this.ipData.equipo.id : '',
    });
  }
  

  guardarCambios() {
    if (this.ipsForm.valid) {
      const ipActualizada: ipAddressModel = {
        id: this.ipsForm.get('id')?.value,
        direccion: this.ipsForm.get('ip')?.value,
        agente: this.ipsForm.get('agenteIp')?.value === '' ? null : this.ipsForm.get('agenteIp')?.value,
        switch: this.ipsForm.get('switch')?.value === '' ? null : this.ipsForm.get('switch')?.value,
        equipo: this.ipsForm.get('equipo')?.value === '' ? null : this.ipsForm.get('equipo')?.value,
      };
      this.dialogRef.close(ipActualizada);
    }
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }
}

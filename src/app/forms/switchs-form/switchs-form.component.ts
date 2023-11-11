import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConexionSwitch } from 'src/app/models/conexionSwitch';
import { switchModel } from 'src/app/models/switchModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sectorModel } from 'src/app/models/sectorModel';
import { ipModel } from 'src/app/models/ipModel';
import { AgentesService } from 'src/app/services/agentes.service';
import { SectoresService } from 'src/app/services/sectores.service';
import { IpsService } from 'src/app/services/ips.service';

@Component({
  selector: 'app-switchs-form',
  templateUrl: './switchs-form.component.html',
  styleUrls: ['./switchs-form.component.css']
})
export class SwitchsFormComponent {

  //Codigo prueba, eliminar cuando se conecte al backend
  sectores: sectorModel[] = [{id: 1,nombre: 'Sector 1'}, {id:2, nombre: 'Sector 2'}, {id: 3, nombre: 'Sector 3'}];
  ips: ipModel[] = [{id:1, direccion:'IP 1'}, {id:2, direccion:'IP 2'}, {id:3, direccion:'IP 3'}];
  agentes: any[] = [{id:1, nombre: 'Milton', apellido: 'Bugallo'}];

  //Codigo real
  switchForm: FormGroup;
  originalData: any;
  titulo = "Agregar switch";
  conexionSwitch: any = ConexionSwitch 
  constructor(
    public dialogRef: MatDialogRef<SwitchsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public switchData: any,
    private fb: FormBuilder, public agentesService: AgentesService, public sectoresService: SectoresService,
    public ipsService: IpsService
  ) {
    this.originalData = { ...switchData };
    this.switchForm = this.fb.group({
      ip: [''],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      agenteSwitch: ['', Validators.required],
      sector: [''],
      conexion: ['' , Validators.required],
      etiqueta: ['', Validators.required],
    });
    if(this.switchData != null){
      this.esEditar();
    }
    else {
      this.switchData = {id: null, ip: {direccion: ''}, marca: '', modelo: '', agente: {nombre:'', apellido:''}, sector: {nombre:''}, etiqueta: '', conexion: ConexionSwitch.SinDato}
    }
    
  }

  // Descomentar al conectar al back
  // ngOnInit() {
  //   this.obtenerSectores();
  //   this.obtenerIps();
  //   this.obtenerAgentes();
  // }

  obtenerAgentes() {
    this.agentesService.getAgentes().subscribe((agentes) => {
      this.agentes = agentes;
    });
  }

  obtenerSectores() {
    this.sectoresService.getSectores().subscribe((sectores) => {
      this.sectores = sectores;
    });
  }

  obtenerIps() {
    this.ipsService.getIps().subscribe((ips) => {
      this.ips = ips.map((ipModel: ipModel) => this.ipsService.mapIPModel(ipModel));
    });
  }

  esEditar(){
    this.titulo = "Editar switch";
    this.switchForm.setValue({
      ip: this.switchData.ip.direccion,
      marca: this.switchData.marca,
      modelo: this.switchData.modelo,
      agenteSwitch: this.switchData.agente.id,
      etiqueta: this.switchData.etiqueta,
      conexion: this.switchData.conexion,
      sector: this.switchData.sector.id,
    });
  }
  

  guardarCambios() {
    if (this.switchForm.valid) {
      const inputValue = this.switchForm.get('ip')?.value;
      const matchingOption = this.ips.find(ip => ip.direccion === inputValue);
  
      const switchActualizado: any = {
        id: this.switchData.id,
        ip: matchingOption ? matchingOption.id : null,
        marca: this.switchForm.get('marca')?.value,
        modelo: this.switchForm.get('modelo')?.value,
        conexion: this.switchForm.get('conexion')?.value,
        etiqueta: this.switchForm.get('etiqueta')?.value,
        sector: this.switchForm.get('sector')?.value === '' ? null : this.switchForm.get('sector')?.value,
        agente: this.switchForm.get('agenteSwitch')?.value === '' ? null : this.switchForm.get('agenteSwitch')?.value,
      };
  
      console.log(switchActualizado)
      this.dialogRef.close(switchActualizado);
    }
  }

  cancelarEdicion() {
    this.switchData = { ...this.originalData };
    this.dialogRef.close();
  }
}

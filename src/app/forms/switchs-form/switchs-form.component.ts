import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConexionSwitch } from 'src/app/models/conexionSwitch';
import { switchModel } from 'src/app/models/switchModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switchs-form',
  templateUrl: './switchs-form.component.html',
  styleUrls: ['./switchs-form.component.css']
})
export class SwitchsFormComponent {

  sectores: string[] = ['Sector 1', 'Sector 2', 'Sector 3'];
  ips: string[] = ['IP 1', 'IP 2', 'IP 3', 'IP 4'];
  switchForm: FormGroup;
  originalData: any;
  titulo = "Agregar switch";
  conexionSwitch: any = ConexionSwitch

  constructor(
    public dialogRef: MatDialogRef<SwitchsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public switchData: switchModel,
    private fb: FormBuilder
  ) {
    this.originalData = { ...switchData };
    this.switchForm = this.fb.group({
      id: ['', Validators.required],
      ip: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      sector: ['', Validators.required],
      conexion: ['', Validators.required],
    });
    if(this.switchData != null){
      this.esEditar();
    }
    else {
      this.switchData = { id: '', ip: '', marca: '', modelo: '', sector: '', conexion: ConexionSwitch.SinDato }
    }
    
  }

  esEditar(){
    this.titulo = "Editar switch";
    this.switchForm.patchValue({
      id: this.switchData.id,
      ip: this.switchData.ip,
      marca: this.switchData.marca,
      modelo: this.switchData.modelo,
      sector: this.switchData.sector,
      conexion: this.switchData.conexion
    });
  }
  

  guardarCambios() {
    if (this.switchForm.valid) {
      const switchActualizado: switchModel = {
        id: this.switchForm.get('id')?.value,
        ip: this.switchForm.get('ip')?.value,
        marca: this.switchForm.get('marca')?.value,
        modelo: this.switchForm.get('modelo')?.value,
        sector: this.switchForm.get('sector')?.value,
        conexion: this.switchForm.get('conexion')?.value,
      };
      this.dialogRef.close(switchActualizado);
    }
  }

  cancelarEdicion() {
    this.switchData = { ...this.originalData };
    this.dialogRef.close();
  }
} 

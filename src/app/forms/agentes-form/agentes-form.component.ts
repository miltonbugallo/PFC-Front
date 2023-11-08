import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agenteModel } from 'src/app/models/agenteModel';
import { sectorModel } from 'src/app/models/sectorModel';

@Component({
  selector: 'app-agentes-form',
  templateUrl: './agentes-form.component.html',
  styleUrls: ['./agentes-form.component.css']
})
export class AgentesFormComponent {
  sectores: sectorModel[] = [{nombre: 'Sector 1'}, {nombre: 'Sector 2'}, {nombre: 'Sector 3'}];
  sectorNuevo: sectorModel = {nombre: ''};
  ips: string[] = ['IP 1', 'IP 2', 'IP 3', 'IP 4'];
  agenteForm: FormGroup;
  originalData: any;
  titulo = "Agregar agente";
 
  constructor(
    public dialogRef: MatDialogRef<AgentesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public agenteData: any,
    private fb: FormBuilder
  ) {
    this.originalData = { ...agenteData };
    this.agenteForm = this.fb.group({
      id: ['', Validators.required],
      ip: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sector: ['', Validators.required],
    });
    if(this.agenteData != null){
      this.esEditar();
    }
    else {
      this.agenteData = {id: '', ip: '', nombre: '', apellido: '', sector: {nombre:''}}
    }
    
  }

  esEditar(){
    this.titulo = "Editar agente";
    this.agenteForm.patchValue({
      id: this.agenteData.id,
      ip: this.agenteData.ip,
      nombre: this.agenteData.nombre,
      apellido: this.agenteData.apellido,
      sector: this.agenteData.sector.nombre,
    });
  }
  

  guardarCambios() {
    if (this.agenteForm.valid) {
      
      this.sectorNuevo.nombre = this.agenteForm.get('sector')?.value
      const agenteActualizado: agenteModel = {
        id: this.agenteForm.get('id')?.value,
        ip: this.agenteForm.get('ip')?.value,
        nombre: this.agenteForm.get('nombre')?.value,
        apellido: this.agenteForm.get('apellido')?.value,
        sector: this.sectorNuevo,
      };
      this.dialogRef.close(agenteActualizado);
    }
  }

  cancelarEdicion() {
    this.agenteData = { ...this.originalData };
    this.dialogRef.close();
  }
}

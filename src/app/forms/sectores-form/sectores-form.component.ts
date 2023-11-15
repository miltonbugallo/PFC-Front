import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { sectorModel } from 'src/app/models/sectorModel';

@Component({
  selector: 'app-sectores-form',
  templateUrl: './sectores-form.component.html',
  styleUrls: ['./sectores-form.component.css']
})
export class SectoresFormComponent {
  sectoresForm: FormGroup;
  originalData: any;
  titulo = "Agregar sector";
 
  constructor(
    public dialogRef: MatDialogRef<SectoresFormComponent>,
    @Inject(MAT_DIALOG_DATA) public sectorData: any,
    private fb: FormBuilder
  ) {
    this.originalData = { ...sectorData };
    this.sectoresForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    if(this.sectorData != null){
      this.esEditar();
    }
    else {
      this.sectorData = {id: '', nombre: '',}
    }
  }

  esEditar(){
    this.titulo = "Editar sector";
    this.sectoresForm.patchValue({
      nombre: this.sectorData.nombre,
    });
  }
  

  guardarCambios() {
    if (this.sectoresForm.valid) {
      const sectorActualizado: sectorModel = {
        id: this.sectorData.id,
        nombre: this.sectoresForm.get('nombre')?.value,
      };
      this.dialogRef.close(sectorActualizado);
    }
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }
}

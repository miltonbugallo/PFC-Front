import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { sistemaOperativoModel } from 'src/app/models/sistemaOperativoModel';

@Component({
  selector: 'app-sistemas-operativos-form',
  templateUrl: './sistemas-operativos-form.component.html',
  styleUrls: ['./sistemas-operativos-form.component.css']
})
export class SistemasOperativosFormComponent {
  sistemasOperativosForm: FormGroup;
  originalData: any;
  titulo = "Agregar sistema operativo";
 
  constructor(
    public dialogRef: MatDialogRef<SistemasOperativosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public soData: any,
    private fb: FormBuilder
  ) {
    this.originalData = { ...soData };
    this.sistemasOperativosForm = this.fb.group({
      nombre: ['', Validators.required],
      version: ['', Validators.required],
    });
    if(this.soData != null){
      this.esEditar();
    }
    else {
      this.soData = {id: '', nombre: '', verison: ''}
    }
  }

  esEditar(){
    this.titulo = "Editar sistema operativo";
    this.sistemasOperativosForm.patchValue({
      nombre: this.soData.nombre,
      version: this.soData.version,
    });
  }
  

  guardarCambios() {
    if (this.sistemasOperativosForm.valid) {
      const soActualizado: sistemaOperativoModel = {
        id: this.soData.id,
        nombre: this.sistemasOperativosForm.get('nombre')?.value,
        version: this.sistemasOperativosForm.get('version')?.value,
      };
      this.dialogRef.close(soActualizado);
    }
  }

  cancelarEdicion() {
    this.soData = { ...this.originalData };
    this.dialogRef.close();
  }
}

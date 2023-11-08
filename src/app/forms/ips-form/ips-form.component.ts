import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ipModel } from 'src/app/models/ipModel';

@Component({
  selector: 'app-ips-form',
  templateUrl: './ips-form.component.html',
  styleUrls: ['./ips-form.component.css']
})
export class IpsFormComponent {
  ipsForm: FormGroup;
  originalData: any;
  titulo = "Agregar ip";
 
  constructor(
    public dialogRef: MatDialogRef<IpsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public ipData: any,
    private fb: FormBuilder
  ) {
    this.originalData = { ...ipData };
    this.ipsForm = this.fb.group({
      id: ['', Validators.required],
      ip: ['', Validators.required],
    });
    if(this.ipData != null){
      this.esEditar();
    }
    else {
      this.ipData = {id: '', ip: '',}
    }
  }

  esEditar(){
    this.titulo = "Editar ip";
    this.ipsForm.patchValue({
      id: this.ipData.id,
      ip: this.ipData.ip,
    });
  }
  

  guardarCambios() {
    if (this.ipsForm.valid) {
      const ipActualizada: ipModel = {
        id: this.ipsForm.get('id')?.value,
        ip: this.ipsForm.get('ip')?.value,
      };
      this.dialogRef.close(ipActualizada);
    }
  }

  cancelarEdicion() {
    this.ipData = { ...this.originalData };
    this.dialogRef.close();
  }
}

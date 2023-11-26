import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { sistemaOperativoModel } from 'src/app/models/sistemaOperativoModel';
import { DialogConfirmComponent } from 'src/app/pages/dialog-confirm/dialog-confirm.component';

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
    private fb: FormBuilder, private dialog: MatDialog
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
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "400"
      dialogConfig.disableClose = true;
      dialogConfig.data = { mensaje: '¿Seguro que deseas guardar estos datos?' }
      const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
      
      dialogRef.afterClosed().subscribe(result => {
        if(result){
      const soActualizado: sistemaOperativoModel = {
        id: this.soData.id,
        nombre: this.sistemasOperativosForm.get('nombre')?.value,
        version: this.sistemasOperativosForm.get('version')?.value,
      };
      this.dialogRef.close(soActualizado);
    }
  });
    }
  }

  cancelarEdicion() {
    this.soData = { ...this.originalData };
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-switchs-form',
  templateUrl: './switchs-form.component.html',
  styleUrls: ['./switchs-form.component.css']
})
export class SwitchsFormComponent {

  constructor(
    public dialogRef: MatDialogRef<SwitchsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public switchData: any
  ) {} 

  ngOnInit(){
    if(!this.switchData){
      this.switchData = { ID: '', IP: '', Condicion: '', Nombre: '', Sector: '', Estado: '' }
    }
  }

  guardarCambios() {
    this.dialogRef.close(this.switchData);
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }
}
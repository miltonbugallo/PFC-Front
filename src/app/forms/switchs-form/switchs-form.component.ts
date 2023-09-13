import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConexionSwitch } from 'src/app/models/conexionSwitch';
import { switchModel } from 'src/app/models/switchModel';

@Component({
  selector: 'app-switchs-form',
  templateUrl: './switchs-form.component.html',
  styleUrls: ['./switchs-form.component.css']
})
export class SwitchsFormComponent {

  constructor(
    public dialogRef: MatDialogRef<SwitchsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public switchData: switchModel
  ) {} 

  conexionSwitch: any = ConexionSwitch

  ngOnInit(){
    if(!this.switchData){
      this.switchData = { id: '', ip: '', marca: '', modelo: '', sector: '', conexion: ConexionSwitch.SinDato }
    }
  }

  guardarCambios() {
    this.dialogRef.close(this.switchData);
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }
}
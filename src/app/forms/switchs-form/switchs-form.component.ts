import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CondicionSwitch } from 'src/app/models/condicionSwitch';
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

  condicionSwitch: any = CondicionSwitch

  ngOnInit(){
    if(!this.switchData){
      this.switchData = { id: '', ip: '', condicion: CondicionSwitch.SinDato, nombre: '', sector: '', estado: '' }
    }
  }

  guardarCambios() {
    this.dialogRef.close(this.switchData);
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }
}
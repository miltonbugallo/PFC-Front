import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CondicionIP } from 'src/app/models/condicionIP';

@Component({
  selector: 'app-agentes-form',
  templateUrl: './agentes-form.component.html',
  styleUrls: ['./agentes-form.component.css']
})
export class AgentesFormComponent {

  constructor(
    public dialogRef: MatDialogRef<AgentesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public agenteData: any
  ) {} 

  condicionIP: any = CondicionIP

  ngOnInit(){
    if(!this.agenteData){
      this.agenteData = { id: '', ip: '', nombre: '', rol: '', ubicacion: '', estadoIP: CondicionIP.SinDato }
    }
  }

  guardarCambios() {
    this.dialogRef.close(this.agenteData);
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }
}

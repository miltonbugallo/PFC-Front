import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-msg',
  templateUrl: './dialog-msg.component.html',
  styleUrls: ['./dialog-msg.component.css']
})
export class DialogMsgComponent {

  show: boolean
    message: string
    constructor(public dialogRef: MatDialogRef<DialogMsgComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.show = this.data.boleanData
      this.message = this.data.messageData
    }  
   
  }
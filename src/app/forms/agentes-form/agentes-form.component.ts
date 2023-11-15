import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sectorModel } from 'src/app/models/sectorModel';
import { AgentesService } from 'src/app/services/agentes.service';
import { ipModel } from 'src/app/models/ipModel';
import { SectoresService } from 'src/app/services/sectores.service';
import { IpsService } from 'src/app/services/ips.service';

@Component({
  selector: 'app-agentes-form',
  templateUrl: './agentes-form.component.html',
  styleUrls: ['./agentes-form.component.css']
})
export class AgentesFormComponent {
  
  sectores: sectorModel[] = [];
  ips: ipModel[] = [];
  agenteForm: FormGroup;
  originalData: any;
  titulo = "Agregar agente";
 
  constructor(
    public dialogRef: MatDialogRef<AgentesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public agenteData: any,
    private fb: FormBuilder, public agentesService: AgentesService, public sectoresService: SectoresService,
    public ipsService: IpsService
  ) {
    this.originalData = { ...agenteData };
    this.agenteForm = this.fb.group({
      ip: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sector: [''],
    });
    if(this.agenteData != null){
      this.esEditar();
    }
    else {
      this.agenteData = {id: null, ip: {direccion: ''}, nombre: '', apellido: '', sector: {nombre:''}}
    }
    
  }

  
  ngOnInit() {
    this.obtenerSectores();
    this.obtenerIps();
  }

  obtenerSectores() {
    this.sectoresService.getSectores().subscribe((sectores) => {
      this.sectores = sectores;
    });
  }

  obtenerIps() {
    this.ipsService.getIps().subscribe((ips) => {
      this.ips = ips.map((ipModel: ipModel) => this.ipsService.mapIPModel(ipModel));
    });
  }

  esEditar(){
    this.titulo = "Editar agente";
    this.agenteForm.patchValue({
      ip: this.agenteData.ip.direccion,
      nombre: this.agenteData.nombre,
      apellido: this.agenteData.apellido,
      sector: this.agenteData.sector.id != -1 ? this.agenteData.sector.id : '',
    });
  }
  

  guardarCambios() {
    if (this.agenteForm.valid) {
      const inputValue = this.agenteForm.get('ip')?.value;
      const matchingOption = this.ips.find(ip => ip.direccion === inputValue);
  
      const agenteActualizado: any = {
        id: this.agenteData.id,
        ip: matchingOption ? matchingOption.direccion : null,
        nombre: this.agenteForm.get('nombre')?.value,
        apellido: this.agenteForm.get('apellido')?.value,
        sector: this.agenteForm.get('sector')?.value === '' ? null : this.agenteForm.get('sector')?.value,
      };
  
      this.dialogRef.close(agenteActualizado);
    }
  }

  cancelarEdicion() {
    this.dialogRef.close();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dispositivoModel } from '../models/dispositivoModel';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {

  public dispositivosData: dispositivoModel[] =
  [
    { id: "1", ip: '10.255.255', dispositivo: 'PC 1', sistemaOperativo: 'Windows 10', ram: 12, agente: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', dispositivo: 'PC 2', sistemaOperativo: 'Linux 10', ram: 4, agente: 'Luengo', sector: 'IT' },
    { id: "3", ip: '30.255.255', dispositivo: 'PC 3', sistemaOperativo: 'Windows 11', ram: 8, agente: 'Robledo', sector: 'Sectorial' },
  ];
  
  private url = 'URL_DE_TU_BACKEND'; // Reemplaza con la URL de tu servicio backend


  constructor(private http: HttpClient) { }

  obtenerDispositivos(){
    return this.dispositivosData
  }
}

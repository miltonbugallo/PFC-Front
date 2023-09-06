import { Injectable } from '@angular/core';
import { switchModel } from '../models/switchModel';
import { CondicionSwitch } from '../models/condicionSwitch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchsService {

  public switchesData: switchModel[] = 
  [
    { id: "1", ip: '10.255.255', condicion: CondicionSwitch.Encendido, nombre: 'Switch 1', sector: 'Oficina Santa Fe', estado: 'Asignado' },
    { id: "2", ip: '10.123.255', condicion: CondicionSwitch.Encendido, nombre: 'Switch 2', sector: 'Oficina Rosario', estado: 'Asignado' },
    { id: "3", ip: '20.255.200', condicion: CondicionSwitch.Apagado, nombre: 'Switch 3', sector: 'Oficina Santa Fe', estado: 'Sin Asignar' },
    { id: "4", ip: '10.254.254', condicion: CondicionSwitch.Encendido, nombre: 'Switch 4', sector: 'Oficina Bs As', estado: 'Asignado' },
    { id: "5", ip: '100.255.255', condicion: CondicionSwitch.Apagado, nombre: 'Switch 5', sector: 'Oficina IT', estado: 'Sin Asignar' },
    { id: "1", ip: '10.255.255', condicion: CondicionSwitch.Encendido, nombre: 'Switch 1', sector: 'Oficina Santa Fe', estado: 'Asignado' },
    { id: "2", ip: '10.123.255', condicion: CondicionSwitch.Encendido, nombre: 'Switch 2', sector: 'Oficina Rosario', estado: 'Asignado' },
    { id: "3", ip: '20.255.200', condicion: CondicionSwitch.Apagado, nombre: 'Switch 3', sector: 'Oficina Santa Fe', estado: 'Sin Asignar' },
    { id: "4", ip: '10.254.254', condicion: CondicionSwitch.Encendido, nombre: 'Switch 4', sector: 'Oficina Bs As', estado: 'Asignado' },
    { id: "5", ip: '100.255.255', condicion: CondicionSwitch.Apagado, nombre: 'Switch 5', sector: 'Oficina IT', estado: 'Sin Asignar' }
  ];
  
  private url = 'URL_DE_TU_BACKEND'; // Reemplaza con la URL de tu servicio backend


  constructor(private http: HttpClient) { }

  obtenerSwitchs(){
    return this.switchesData
  }


  agregarSwitch(switchNuevo: switchModel): Observable<boolean> {
    return this.http.post<boolean>(this.url, switchNuevo);
  }

  //Editar
  editarSwitch(switchEditar: switchModel): Observable<boolean> {
    const editUrl = `${this.url}/${switchEditar.id}`;
    return this.http.put<boolean>(editUrl, switchEditar);
  }

  //Delete
  deleteSwitch(switchDelete: switchModel): Observable<boolean> {
    const deleteUrl = `${this.url}/${switchDelete.id}`;
    return this.http.delete<boolean>(deleteUrl);
  }

}

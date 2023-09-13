import { Injectable } from '@angular/core';
import { switchModel } from '../models/switchModel';
import { ConexionSwitch } from '../models/conexionSwitch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchsService {

  public switchesData: switchModel[] = 
  [
    { id: "1", ip: '10.255.255', marca: 'Switch 1', modelo: 'TP-Link 1' , sector: 'Secretaria', conexion: ConexionSwitch.Encendido },
    { id: "2", ip: '20.255.255', marca: 'Switch 2', modelo: 'TP-Link 2' , sector: 'IT', conexion: ConexionSwitch.Encendido },
    { id: "3", ip: '30.255.255', marca: 'Switch 3', modelo: 'TP-Link 3' , sector: 'Ministerio', conexion: ConexionSwitch.Apagado },
    { id: "4", ip: '40.255.255', marca: 'Switch 4', modelo: 'TP-Link 4' , sector: 'Secretaria', conexion: ConexionSwitch.Encendido },
    { id: "5", ip: '50.255.255', marca: 'Switch 5', modelo: 'TP-Link 5' , sector: 'Area Comercio', conexion: ConexionSwitch.Apagado },
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

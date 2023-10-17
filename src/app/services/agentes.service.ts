import { Injectable } from '@angular/core';
import { CondicionIP } from '../models/condicionIP';
import { HttpClient } from '@angular/common/http';
import { agenteModel } from '../models/agenteModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {

  constructor(private http: HttpClient) { }


  agentesData = [
    { id: "1", ip: '10.255.255', nombre: 'Milton', rol: 'Usuario', ubicacion: 'Secretaria', estadoIP: CondicionIP.Asignada },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', rol: 'Usuario', ubicacion: 'IT', estadoIP: CondicionIP.Asignada },
    { id: "3", ip: '30.255.255', nombre: 'Miguel', rol: 'Usuario', ubicacion: 'Ministerio', estadoIP: CondicionIP.SinAsignar },
  ];

  private url = 'URL_DE_TU_BACKEND'; // Reemplaza con la URL de tu servicio backend

  obtenerAgentes() {
    return this.agentesData
  }

  agregarAgente(agenteNuevo: agenteModel): Observable<boolean> {
    return this.http.post<boolean>(this.url, agenteNuevo);
  }

  //Editar
  editarAgente(agenteEditar: agenteModel): Observable<boolean> {
    const editUrl = `${this.url}/${agenteEditar.id}`;
    return this.http.put<boolean>(editUrl, agenteEditar);
  }

  //Delete
  deleteAgente(agenteDelete: agenteModel): Observable<boolean> {
    const deleteUrl = `${this.url}/${agenteDelete.id}`;
    return this.http.delete<boolean>(deleteUrl);
  }

}

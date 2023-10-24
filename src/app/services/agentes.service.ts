import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { agenteModel } from '../models/agenteModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {

  constructor(private http: HttpClient) { }


  public agentesData: agenteModel[]= [
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
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

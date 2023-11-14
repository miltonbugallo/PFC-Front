import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LoginService } from './login.service';
import { switchModel } from '../models/switchModel';
import { ConexionSwitch } from '../models/conexionSwitch';

@Injectable({
  providedIn: 'root'
})
export class SwitchsService {

  constructor(private http: HttpClient, public loginService: LoginService) { }

  private apiUrl = 'http://localhost:250/api/switches';
  private token = this.loginService.getToken(); 

  //Datos pruebas

    getSwitchesFicticios(): Observable<switchModel[]> {
      const switchesFicticiosData = [
        {
          id: 1,
          marca: "Marca1",
          modelo: "Modelo1",
          estadoConexion: true,
          sector: {
            id: 1,
            nombre: "Sector 1"
          },
          agente: {
            id: 1,
            nombre: "Nombre1",
            apellido: "Apellido1"
          },
          etiqueta: "SW01",
          ipadress: {
            id: 1,
            direccion: "IP 1"
          }
        },
        {
          id: 3,
          marca: "Marca3",
          modelo: "Modelo1",
          estadoConexion: true,
          agente: {
            id: 2,
            nombre: "Nombre2",
            apellido: "Apellido2"
          },
          etiqueta: "SW01",
          ipadress: {
            id: 2,
            direccion: "IP 2"
          }
        },
        {
          id: 2,
          marca: "Marca2",
          modelo: "Modelo1",
          estadoConexion: false,
          sector: {
            id: 1,
            nombre: "Sector 1"
          },
          etiqueta: "SW01",
          ipadress: {
            id: 3,
            direccion: "IP 3"
          }
        },
        {
          id: 4,
          marca: "Marca4",
          modelo: "Modelo1",
          estadoConexion: false,
          sector: {
            id: 1,
            nombre: "Sector 1"
          },
          etiqueta: "SW01",
        }
      
      ];
  
      // Aplicar el mapeo a cada elemento de la lista
      const switchesFicticiosMapeados = switchesFicticiosData.map(switchs => this.mapSwitch(switchs));
  
      return of(switchesFicticiosMapeados);
    }



  // Datos reales
  getSwitch(): Observable<switchModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((data) => {
        return data.map((switchs) => this.mapSwitch(switchs));
      })
    );
  }

  private mapSwitch(switchs: any): switchModel {
    return {
      id: switchs.id,
      ip: switchs.ipadress ? switchs.ipadress : {id:-1, direccion:''},
      marca: switchs.marca,
      modelo: switchs.modelo,
      sector: switchs.sector ? switchs.sector : {id:-1, nombre:''},
      conexion: switchs.estadoConexion == true ? ConexionSwitch.Encendido : ConexionSwitch.Apagado,
      agente: switchs.agente ? switchs.agente : {id:-1, nombre:'', apellido: ''},
      etiqueta: switchs.etiqueta
    };
  }

  crearSwitch(switchs: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      marca: switchs.marca,
      modelo: switchs.modelo,
      etiqueta: switchs.etiqueta,
      estadoConexion: switchs.conexionSwitch == ConexionSwitch.Encendido ? true : false,
      sector: switchs.sector ? `/api/sectors/${switchs.sector}` : null,
      agente: switchs.agente ? `/api/agentes/${switchs.agente}` : null,
      ipAdress: switchs.ip ? { direccion: `/api/ip_adresses/${switchs.ip}` } : null,
    };
    console.log(requestBody)

    // Realizamos la solicitud POST
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/agregar-switch`, JSON.stringify(requestBody), { headers });
  }


  eliminarSwitch(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(`${this.apiUrl}/eliminar-switch/${id}`, { headers });
  }

  actualizarSwitch(switchs: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      marca: switchs.marca,
      modelo: switchs.modelo,
      etiqueta: switchs.etiqueta,
      estadoConexion: switchs.conexionSwitch == ConexionSwitch.Encendido ? true : false,
      sector: switchs.sector ? `/api/sectors/${switchs.sector}` : null,
      agente: switchs.agente ? `/api/agentes/${switchs.agente}` : null,
      ipAdress: switchs.ip ? { direccion: `/api/ip_adresses/${switchs.ip}` } : null,
    };
    console.log(requestBody)

    // Realizamos la solicitud PATCH
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.patch(`${this.apiUrl}/actualizar-switch/${switchs.id}`, JSON.stringify(requestBody), { headers });
  }
  

}

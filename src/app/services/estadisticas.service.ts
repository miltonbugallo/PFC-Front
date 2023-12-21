import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private apiUrl = '/servidor/estadisticas';
  private token = this.loginService.getToken();
  public agentesEstadistica: any = [];
  public sistemasOperativosEstadistica: any = [];
  public memoriasRamEstadistica: any = [];
  public ipDuplicadasEstadistica: any = [];

  constructor(private http: HttpClient, public loginService: LoginService) { }

  getEstadisticas(): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((response: any) => {
        this.sistemasOperativosEstadistica = response.sistemas_operativos ? response.sistemas_operativos : [];
        this.memoriasRamEstadistica = response.memorias_ram ? response.memorias_ram : [];
        this.agentesEstadistica = response.agentes ? response.agentes : [];
        this.ipDuplicadasEstadistica = response.ip_duplicadas ? response.ip_duplicadas : [];
      })
    );
  }

  cargarGraficoAgentes(){
    return [
      {
        "name": "Con Equipo asignado",
        "value": this.agentesEstadistica.con_equipo ? this.agentesEstadistica.con_equipo : 0
      },
      {
        "name": "Sin equipo asignado",
        "value": this.agentesEstadistica.sin_equipo ? this.agentesEstadistica.sin_equipo : 0
      }
    ];
  }

  cargarGraficoRAM(){
    return [
      {
        "name": "Mayor a 7.8GB",
        "value": this.memoriasRamEstadistica.Mayor_a_7800 ? this.memoriasRamEstadistica.Mayor_a_7800 : 0
      },
      {
        "name": "Menor a 3.7GB",
        "value":  this.memoriasRamEstadistica.Menor_a_3700 ? this.memoriasRamEstadistica.Menor_a_3700 : 0
      },
      {
        "name": "Entre 3.7 y 7.8GB",
        "value":  this.memoriasRamEstadistica.Entre_3700_y_7800 ? this.memoriasRamEstadistica.Entre_3700_y_7800 : 0
      }
    ];
  }

  cargarGraficoIpsConflictivas(){
    return [
      {
        "name": "Ips duplicadas",
        "value": this.ipDuplicadasEstadistica.porcentaje ? this.ipDuplicadasEstadistica.porcentaje : 0
      },
      {
        "name": "Ips correctas",
        "value": this.ipDuplicadasEstadistica.porcentaje ? 100-this.ipDuplicadasEstadistica.porcentaje : 0
      },  
    ];
  }

  cargarGraficoSO() {
    const sistemasOperativos = this.sistemasOperativosEstadistica;
    const resultado = Object.keys(sistemasOperativos).map(key => {
      return {
        name: key === "" ? "Sin SO" : key,
        value: sistemasOperativos[key]
      };
    });
    resultado.sort((a, b) => b.value - a.value);
  
    return resultado;
  }

}

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

  // getEstadisticas(): Observable<any> {
  //   // Datos simulados que quieres retornar
  //   const datosSimulados = {
  //     sistemas_operativos: {
  //       "Windows 7": 1.2658227848101267,
  //       "Windows 10": 0.31645569620253167
  //     },
  //     memorias_ram: {
  //       "Mayor_a_7800": 30.37974683544304,
  //       "Menor_a_3700": 57.91139240506329,
  //       "Entre_3700_y_7800": 11.708860759493671
  //     },
  //     agentes: {
  //       "con_equipo": 0.8347245409015025,
  //       "sin_equipo": 99.1652754590985
  //     },
  //     ip_duplicadas: {
  //       "porcentaje": 0.3448275862068966,
  //       "caso1": 0,
  //       "caso2": 1,
  //       "caso3": 0,
  //       "total": 290
  //     }
  //   };
  
  //   // Separar y asignar los datos simulados a las variables específicas
  //   this.sistemasOperativosEstadistica = datosSimulados.sistemas_operativos ? datosSimulados.sistemas_operativos : [];
  //   this.memoriasRamEstadistica = datosSimulados.memorias_ram ? datosSimulados.memorias_ram : [];
  //   this.agentesEstadistica = datosSimulados.agentes ? datosSimulados.agentes : [];
  //   this.ipDuplicadasEstadistica = datosSimulados.ip_duplicadas ? datosSimulados.ip_duplicadas : [];
  //   console.log(datosSimulados)
  
  //   // Retornar un observable con los datos simulados
  //   return of();
  // }

  

  cargarGraficoAgentes(){
    return [
      {
        "name": "Con Equipo asignado",
        "value": this.agentesEstadistica.con_equipo
      },
      {
        "name": "Sin equipo asignado",
        "value": this.agentesEstadistica.sin_equipo
      }
    ];
  }

  cargarGraficoRAM(){
    return [
      {
        "name": "Mayor a 7.8GB",
        "value": this.memoriasRamEstadistica.Mayor_a_7800
      },
      {
        "name": "Menor a 3.7GB",
        "value":  this.memoriasRamEstadistica.Menor_a_3700
      },
      {
        "name": "Entre 3.7 y 7.8GB",
        "value":  this.memoriasRamEstadistica.Entre_3700_y_7800
      }
    ];
  }

  cargarGraficoIpsConflictivas(){
    return [
      {
        "name": "Ips duplicadas",
        "value": this.ipDuplicadasEstadistica.porcentaje
      },
      {
        "name": "Ips correctas",
        "value": 100-this.ipDuplicadasEstadistica.porcentaje
      },  
    ];
  }

  cargarGraficoSO() {
    const sistemasOperativos = this.sistemasOperativosEstadistica;
    const resultado = Object.keys(sistemasOperativos).map(key => {
      return {
        name: key,
        value: sistemasOperativos[key]
      };
    });
    resultado.sort((a, b) => b.value - a.value);

    return resultado;
  }

}

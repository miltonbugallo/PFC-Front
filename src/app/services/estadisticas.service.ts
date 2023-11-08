import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor() { }

  cargarGraficoAgentes(){
    return [
      {
        "name": "Area IT",
        "value": 250
      },
      {
        "name": "Secreatria",
        "value": 100
      },
      {
        "name": "Sectorial",
        "value": 25
      },
  
    ];
  }

  cargarGraficoRAM(){
    return [
      {
        "name": "4 GB",
        "value": 20
      },
      {
        "name": "8GB",
        "value": 50
      },
      {
        "name": "10GB",
        "value": 15
      },
      {
        "name": "12GB",
        "value": 7
      }
    ];
  }

  cargarGraficoIpsConflictivas(){
    return [
      {
        "name": "Ips duplicadas",
        "value": 250
      },
      {
        "name": "Ips correctas",
        "value": 100
      },  
    ];
  }

  cargarGraficoSO(){
    return [
      {
        "name": "Windows 10",
        "value": 20
      },
      {
        "name": "Windows 11",
        "value": 50
      },
      {
        "name": "Linux 10",
        "value": 15
      },
      {
        "name": "Linux 20",
        "value": 7
      }
    ];
  }

}

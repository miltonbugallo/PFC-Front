import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchsService {

  constructor() { }

  switchesData = [
    { ID: "1", IP: '10.255.255', Condicion: 'Encendido', Nombre: 'Switch 1', Sector: 'Oficina Santa Fe', Estado: 'Asignado' },
    { ID: "2", IP: '10.123.255', Condicion: 'Encendido', Nombre: 'Switch 2', Sector: 'Oficina Rosario', Estado: 'Asignado' },
    { ID: "3", IP: '20.255.200', Condicion: 'Apagado', Nombre: 'Switch 3', Sector: 'Oficina Santa Fe', Estado: 'Sin Asignar' },
    { ID: "4", IP: '10.254.254', Condicion: 'Encendido', Nombre: 'Switch 4', Sector: 'Oficina Bs As', Estado: 'Asignado' },
    { ID: "5", IP: '100.255.255', Condicion: 'Apagado', Nombre: 'Switch 5', Sector: 'Oficina IT', Estado: 'Sin Asignar' },
    { ID: "1", IP: '10.255.255', Condicion: 'Encendido', Nombre: 'Switch 1', Sector: 'Oficina Santa Fe', Estado: 'Asignado' },
    { ID: "2", IP: '10.123.255', Condicion: 'Encendido', Nombre: 'Switch 2', Sector: 'Oficina Rosario', Estado: 'Asignado' },
    { ID: "3", IP: '20.255.200', Condicion: 'Apagado', Nombre: 'Switch 3', Sector: 'Oficina Santa Fe', Estado: 'Sin Asignar' },
    { ID: "4", IP: '10.254.254', Condicion: 'Encendido', Nombre: 'Switch 4', Sector: 'Oficina Bs As', Estado: 'Asignado' },
    { ID: "5", IP: '100.255.255', Condicion: 'Apagado', Nombre: 'Switch 5', Sector: 'Oficina IT', Estado: 'Sin Asignar' }
  ];

  obtenerSwitchs(){
    return this.switchesData
  }

}

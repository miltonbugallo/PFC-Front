import { Component, ElementRef, ViewChild } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  constructor(private estadisticasService: EstadisticasService) { }

  ngOnInit() {
    this.estadisticasService.getEstadisticas().subscribe(() => {});
  }

  mostrarGraficoAgentes1: boolean = false;
  mostrarGraficoAgentes2: boolean = false;
  mostrarGraficoRam1: boolean = false;
  mostrarGraficoRam2: boolean = false;
  mostrarGraficoSO1: boolean = false;
  mostrarGraficoSO2: boolean = false;
  mostrarGraficoIpsConflictivas1: boolean = false;
  mostrarGraficoIpsConflictivas2: boolean = false;
  titulo1: string = 'Estadistica 1';
  titulo2: string = 'Estadistica 2';

  ocultarEstadisticas1(){
    this.mostrarGraficoAgentes1 = false;
    this.mostrarGraficoRam1 = false;
    this.mostrarGraficoSO1 = false;
    this.mostrarGraficoIpsConflictivas1 = false;
  }
  ocultarEstadisticas2(){
    this.mostrarGraficoAgentes2 = false;
    this.mostrarGraficoRam2 = false;
    this.mostrarGraficoSO2 = false;
    this.mostrarGraficoIpsConflictivas2 = false;
  }


  actualizarEstadistica(selectId: string) {
    const select = document.getElementById(selectId) as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex].value;
    if(selectId === 'estadisticas1'){
      switch (selectedOption){
        case 'graficoAgentes1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoAgentes1 = true;
          this.titulo1 = "Cantidad de agentes con/sin equipo";
          break;
        case 'graficoRAM1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoRam1 = true;
          this.titulo1 = "RAM de Dispositivos";
          break;
        case 'graficoSO1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoSO1 = true;
          this.titulo1 = "Porcentaje Sistemas Operativos";
          break;
        case 'graficoIpsConflictivas1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoIpsConflictivas1 = true;
          this.titulo1 = "Porcentaje Ips correctas/conflictivas";
          break;
      }
    }
    else {
      switch (selectedOption){
        case 'graficoAgentes2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoAgentes2 = true;
          this.titulo2 = "Cantidad de agentes con/sin equipo";
          break;
        case 'graficoRAM2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoRam2 = true;
          this.titulo2 = "RAM de Dispositivos";
          break;
        case 'graficoSO2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoSO2 = true;
          this.titulo2 = "Porcentaje Sistemas Operativos";
          break;
        case 'graficoIpsConflictivas2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoIpsConflictivas2 = true;
          this.titulo2 = "Porcentaje Ips correctas/conflictivas";
          break;
      }
    }
    
  }
}


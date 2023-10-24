import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  mostrarGraficoAgentes1: boolean = false;
  mostrarGraficoAgentes2: boolean = false;
  mostrarGraficoRam1: boolean = false;
  mostrarGraficoRam2: boolean = false;
  mostrarGraficoSO1: boolean = false;
  mostrarGraficoSO2: boolean = false;
  mostrarGraficoCantidadTotal1: boolean = false;
  mostrarGraficoCantidadTotal2: boolean = false;
  titulo1: string = 'Estadistica 1';
  titulo2: string = 'Estadistica 2';

  ocultarEstadisticas1(){
    this.mostrarGraficoAgentes1 = false;
    this.mostrarGraficoRam1 = false;
    this.mostrarGraficoSO1 = false;
    this.mostrarGraficoCantidadTotal1 = false;
  }
  ocultarEstadisticas2(){
    this.mostrarGraficoAgentes2 = false;
    this.mostrarGraficoRam2 = false;
    this.mostrarGraficoSO2 = false;
    this.mostrarGraficoCantidadTotal2 = false;
  }


  actualizarEstadistica(selectId: string) {
    console.log(selectId)
    const select = document.getElementById(selectId) as HTMLSelectElement;
    const selectedOption = select.options[select.selectedIndex].value;
    if(selectId === 'estadisticas1'){
      switch (selectedOption){
        case 'graficoAgentes1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoAgentes1 = true;
          this.titulo1 = "Cantidad de agentes por sector";
          break;
        case 'graficoRAM1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoRam1 = true;
          this.titulo1 = "RAM de Dispositivos";
          break;
        case 'graficoSO1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoSO1 = true;
          this.titulo1 = "Sistemas Operativos";
          break;
        case 'graficoCantidadTotal1':
          this.ocultarEstadisticas1();
          this.mostrarGraficoCantidadTotal1 = true;
          this.titulo1 = "Cantidad total de agentes y dispositivos";
          break;
      }
    }
    else {
      switch (selectedOption){
        case 'graficoAgentes2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoAgentes2 = true;
          this.titulo2 = "Cantidad de agentes por sector";
          break;
        case 'graficoRAM2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoRam2 = true;
          this.titulo2 = "RAM de Dispositivos";
          break;
        case 'graficoSO2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoSO2 = true;
          this.titulo2 = "Sistemas Operativos";
          break;
        case 'graficoCantidadTotal2':
          this.ocultarEstadisticas2();
          this.mostrarGraficoCantidadTotal2 = true;
          this.titulo2 = "Cantidad total de agentes y dispositivos";
          break;
      }
    }
    
  }
}


import { Component } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-grafico-ram',
  templateUrl: './grafico-ram.component.html',
  styleUrls: ['./grafico-ram.component.css']
})
export class GraficoRamComponent {
  single: any = []

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Rango Memoria RAM';
  showYAxisLabel = true;
  yAxisLabel = 'Porcentaje de equipos';


  constructor(private estadisticasService: EstadisticasService) {
  }

  ngOnInit(): void {
    this.single = this.estadisticasService.cargarGraficoRAM();
  }

}

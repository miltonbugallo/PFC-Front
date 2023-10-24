import { Component } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-grafico-so',
  templateUrl: './grafico-so.component.html',
  styleUrls: ['./grafico-so.component.css']
})
export class GraficoSOComponent {

  single: any = []

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Sistema Operativo';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad de equipos';


  constructor(private estadisticasService: EstadisticasService) {
  }

  ngOnInit(): void {
    this.single = this.estadisticasService.cargarGraficoSO();
  }

}

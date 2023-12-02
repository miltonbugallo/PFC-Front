import { Component } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-grafico-so',
  templateUrl: './grafico-so.component.html',
  styleUrls: ['./grafico-so.component.css']
})
export class GraficoSOComponent {

  single: any = []

  view: [number, number] = [500, 400];

  // options
  showLegend = true;
  showLabels = true;
  doughnut = false;

  constructor(private estadisticasService: EstadisticasService) {
  }

  ngOnInit(): void {
    this.single = this.estadisticasService.cargarGraficoSO();
  }

}

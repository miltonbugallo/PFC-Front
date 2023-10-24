import { Component } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-grafico-cantidad-total',
  templateUrl: './grafico-cantidad-total.component.html',
  styleUrls: ['./grafico-cantidad-total.component.css']
})
export class GraficoCantidadTotalComponent {
  single: any = []

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private estadisticasService: EstadisticasService) {
  }

  ngOnInit(): void {
    this.single = this.estadisticasService.cargarGraficoCantidadTotal();
  }

}

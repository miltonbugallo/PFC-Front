import { Component } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-grafico-so',
  templateUrl: './grafico-so.component.html',
  styleUrls: ['./grafico-so.component.css']
})
export class GraficoSOComponent {

  single: any;
  view: [number, number] = [550, 400];

  constructor(private estadisticasService: EstadisticasService) {
  }

  ngOnInit(): void {
    this.single = this.estadisticasService.cargarGraficoSO();
  }

}

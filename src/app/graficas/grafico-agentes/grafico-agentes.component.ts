import { Component } from '@angular/core';
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-grafico-agentes',
  templateUrl: './grafico-agentes.component.html',
  styleUrls: ['./grafico-agentes.component.css']
})
export class GraficoAgentesComponent {

  single: any = [];
  view: [number, number] = [900, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  isDoughnut: boolean = false;

  constructor(private estadisticasService: EstadisticasService) {
  }

  ngOnInit(): void {
    this.single = this.estadisticasService.cargarGraficoAgentes();
  }
  
}


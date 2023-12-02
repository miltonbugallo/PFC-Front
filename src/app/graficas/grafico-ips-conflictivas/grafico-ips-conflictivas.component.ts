import { Component, HostListener } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-grafico-ips-conflictivas',
  templateUrl: './grafico-ips-conflictivas.component.html',
  styleUrls: ['./grafico-ips-conflictivas.component.css']
})
export class GraficoIpsConflictivasComponent {
  single: any = []

  view: [number, number] = [900, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  isDoughnut: boolean = false;

  constructor(private estadisticasService: EstadisticasService) {
  }

  ngOnInit(): void {
    this.single = this.estadisticasService.cargarGraficoIpsConflictivas();
  }
  

}

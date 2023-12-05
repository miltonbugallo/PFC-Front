import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private alertasService: AlertasService) {}

  alertasEquipos: any[] = [];
  alertasSwitch: any[] = [];
  cantidadAlertasEquipos: number = 0;
  cantidadAlertasSwitchs: number = 0;

  obtenerDatos() {
    this.alertasService.getAlertas().subscribe((datos) => {
      this.alertasEquipos = datos.equiposObsoletos;
      this.alertasSwitch = datos.switchSinConexion;
      this.cantidadAlertasEquipos = this.alertasEquipos.length;
      this.cantidadAlertasSwitchs = this.alertasSwitch.length;
    });
  }

  ngOnInit() {
    // Ejecutar obtenerDatos cada 2 minutos
    interval(2 * 60 * 1000)  // 2 minutos en milisegundos
      .subscribe(() => {
        this.obtenerDatos();
      });
    
    // También ejecutar obtenerDatos al inicio
    this.obtenerDatos();
  }
}


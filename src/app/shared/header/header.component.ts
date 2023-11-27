import { Component } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor( private alertasService: AlertasService){}

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
    this.obtenerDatos();
  }
}

import { Component } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor( private alertasService: AlertasService){}

  alertasData = this.alertasService.obtenerAlertas()
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems?:any[];

  constructor(private router:Router, public loginService: LoginService) {} 
  
  ngOnInit() {

    this.menuItems = [
        { titulo: 'Ips', url: 'ips', icono: 'fas fa-network-wired' },
        { titulo: 'Switches', url: 'switches', icono: 'fa fa-cubes' },
        { titulo: 'Agentes', url: 'agentes', icono: 'fa fa-users' },
        { titulo: 'Dispositivos', url: 'dispositivos', icono: 'fa-solid fa-laptop-code' },
        { titulo: 'Ips - Agentes Sin Equipo', url: 'ipsDuplicadasAgentesSinEquipo', icono: 'fa fa-copy' },
        { titulo: 'Estadísticas', url: 'estadisticas', icono: 'fa-solid fa-chart-line' },
        { titulo: 'Sectores', url: 'sectores', icono: 'fa-solid fa-landmark-flag' },
        { titulo: 'Sistemas Operativos', url: 'sistemasOperativos', icono: 'fa-brands fa-windows'},
      ]
  }

  logout(){
  this.loginService.deleteToken()
  this.router.navigate(['/login']);
  }

}

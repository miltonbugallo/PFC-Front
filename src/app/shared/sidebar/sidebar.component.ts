import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any; // Declara jQuery para que TypeScript lo reconozca

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems?:any[];

  constructor(private router:Router) {} 
  
  ngOnInit() {

    this.menuItems = [
        { titulo: 'Switchs', url: 'switchs', icono: 'fa fa-cubes' },
        { titulo: 'Agentes', url: 'agentes', icono: 'fa fa-users' },
        { titulo: 'Logout', url: 'login', icono: 'fas fa-sign-out-alt' },
      ]
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {



  estadistica1: string = 'Estadística 1 inicial';
  estadistica2: string = 'Estadística 2 inicial';

  actualizarEstadistica(selectId: string) {
    const select = document.getElementById(selectId) as HTMLSelectElement;
    const opcionSeleccionada = select.value;

    switch (selectId) {
      case 'opciones1':
        this.estadistica1 = this.obtenerEstadistica(opcionSeleccionada);
        break;
      case 'opciones2':
        this.estadistica2 = this.obtenerEstadistica(opcionSeleccionada);
        break;
      default:
        break;
    }
  }

  obtenerEstadistica(opcionSeleccionada: string): string {
    switch (opcionSeleccionada) {
      case 'opcion1':
        return 'Estadística para Opción 1';
      case 'opcion2':
        return 'Estadística para Opción 2';
      // Agrega más casos según tus necesidades
      default:
        return 'Estadística predeterminada';
    }
  }
}

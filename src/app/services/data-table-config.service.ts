import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableConfigService {
  
  getDatatableConfig() {
    const options = {
      responsive: true,
      lengthChange: false,
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      buttons: ["excel", "pdf", "print", "colvis"],
      language: {
        search: "Buscar:",
        searchPlaceholder: "Escribe para buscar",
        info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        infoEmpty: "Mostrando 0 a 0 de 0 entradas",
        infoFiltered: "(filtrado de _MAX_ entradas en total)",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        buttons: {
          print: "Imprimir",
          colvis: "Mostrar/Ocultar columnas"
        },
        zeroRecords: "No se encontraron datos para mostrar",
      }
    };
    return Object.assign(options);
  }
}
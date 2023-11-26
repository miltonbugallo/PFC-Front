
export interface ipDuplicadaModel {
    id: number,
    direccion: string,
    agente: {
      nombre: string,
      apellido: string
    },
    switch: {
      etiqueta: string
    },
    equipo: {
      nombreDispositivo: string
    }
  }


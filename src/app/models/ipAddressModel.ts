export interface ipAddressModel {
    id: number,
    direccion: string,
    agente: {
      nombre: string,
      apellido: string
    },
    switches: {
      marca: string,
      modelo: string,
      estadoConexion: boolean,
      etiqueta: string
    },
    equipo: {
      nombreDispositivo: string,
      sistemaOperativo: string,
      memoriaRam: number,
      macaddress: string
    }
  }


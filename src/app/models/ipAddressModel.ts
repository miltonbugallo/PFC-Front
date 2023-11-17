
export interface ipAddressModel {
    id: number,
    direccion: string,
    agente: {
      id: number;
      nombre: string,
      apellido: string
    },
    switches: {
      id: number;
      marca: string,
      modelo: string,
      estadoConexion: boolean,
      sector: string,
      agente: {
        id: number;
        nombre: string,
        apellido: string
      },
      etiqueta: string
    },
    equipo: {
      id: number;
      nombreDispositivo: string,
      sistemaOperativo: string,
      memoriaRam: number,
      macaddress: string
    }
  }


export interface Reserva {
  id?: number;
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  cantidadPersonas: number;
  fecha: string;
  hora: string;
  mesa?: number;
  observaciones?: string;
}

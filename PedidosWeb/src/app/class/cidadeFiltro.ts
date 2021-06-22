import { EstadoFiltro } from './estadoFiltro';
export class CidadeFiltro {
  IdCidade: string;
  Nome: string;
  CodigoIBGE: string;
  Estado: EstadoFiltro;

  constructor() {
    this.IdCidade = null;
    this.Nome = null;
    this.CodigoIBGE = null;
    this.Estado = new EstadoFiltro();
  }
}


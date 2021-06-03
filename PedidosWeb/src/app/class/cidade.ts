import { Estado } from './estado';
export class Cidade {
  IdCidade: string;
  Nome: string;
  CodigoIBGE: string;
  Estado: Estado;
  IdEstado: String;

  constructor() {
    this.IdCidade = '';
    this.Nome = '';
    this.CodigoIBGE = '';
    this.Estado = new Estado;
    this.IdEstado = '';
  }
}


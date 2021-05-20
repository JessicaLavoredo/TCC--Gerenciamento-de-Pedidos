import { Estado } from './estado';
export class Cidade {
  IdCidade: string;
  Nome: string;
  CodigoIBGE: string;
  Estado: Estado;

  constructor() {
    this.IdCidade = '';
    this.Nome = '';
    this.CodigoIBGE = '';
    this.Estado = new Estado;
  }
}


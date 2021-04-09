import { Estado } from './estado';
export class Cidade {
  idCidade: string;
  nome: string;
  codigoIBGE: string;
  estado: Estado;

  constructor() {
    this.idCidade = '';
    this.nome = '';
    this.codigoIBGE = '';
    this.estado = new Estado;
  }
}


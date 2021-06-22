import { CidadeFiltro } from './cidadeFiltro';
import { CategoriaEndereco } from "./categoria-endereco";
export class enderecoFitro {

    CEP: string;
    Logradouro: string;
    Numero: string;
    Bairro: string;
    IdCidade: string;
    IdCategoriaEndereco: string;
    Observacao: string;
    Cidade: CidadeFiltro

    constructor() {
        this.CEP = null;
        this.Logradouro = null;
        this.Numero = null;
        this.Bairro = null;
        this.IdCidade = null;
        this.IdCategoriaEndereco = null;
        this.Observacao = null;
        this.Cidade = new CidadeFiltro();
    }

}

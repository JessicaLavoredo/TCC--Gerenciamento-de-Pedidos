import { Cidade } from './cidade';
import { CategoriaEndereco } from "./categoria-endereco";

export class enderecoRetorno {
    CEP: string;
    Logradouro: string;
    Numero: string;
    Bairro: string;
    Cidade: Cidade;
    CategoriaEndereco: CategoriaEndereco;
    Observacao: string;
    NomeCidade: string;
    DescricaoCategoriaEndereco: string;

    constructor() {
        this.CEP = '';
        this.Logradouro = '';
        this.Numero = '';
        this.Bairro = '';
        this.Cidade = new Cidade;
        this.CategoriaEndereco = new CategoriaEndereco;
        this.Observacao = '';
        this.NomeCidade = '';
        this.DescricaoCategoriaEndereco = '';
    }

}

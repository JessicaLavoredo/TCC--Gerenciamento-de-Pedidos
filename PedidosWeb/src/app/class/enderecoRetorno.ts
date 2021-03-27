export class enderecoRetorno {
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    idCidade: string;
    nomeCidade: string;
    idCategoriaEndereco: string;
    descricaoCategoriaEndereco: string;
    observacao: string;

    constructor() {
        this.cep = '';
        this.logradouro = '';
        this.numero = '';
        this.bairro = '';
        this.idCidade = '';
        this.idCategoriaEndereco = '';
        this.observacao = '';
        this.nomeCidade = '';
        this.descricaoCategoriaEndereco = '';
    }

}

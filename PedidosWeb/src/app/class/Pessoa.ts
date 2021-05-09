import { email } from './email';
import { endereco } from './endereco';
import { telefone } from './telefone';

export class Pessoa {
    idPessoa: string;
    Descritivo: string;
    tipoPessoa: string;
    nomeRazao: string;
    apelidoFantasia: string;
    cpfCnpj: string;
    rgInscricao: string;
    dataNascimento: Date;
    genero: string;
    inativo: boolean;
    dataInclusao: Date;
    vinculos: string[];
    enderecos: endereco[];
    telefones: telefone[];
    emails: email[];

    constructor() {
        this.idPessoa = '';
        this.Descritivo = '';
        this.tipoPessoa = '';
        this.nomeRazao = '';
        this.apelidoFantasia = '';
        this.cpfCnpj = '';
        this.rgInscricao = '';
        this.dataNascimento = new Date(1900, 1, 1);
        this.genero = '';
        this.inativo = false;
        this.dataInclusao = new Date;
        this.vinculos = [];
        this.enderecos = [];
        this.telefones = [];
        this.emails = [];
    }

}



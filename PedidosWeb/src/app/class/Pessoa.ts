import { email } from './email';
import { endereco } from './endereco';
import { telefone } from './telefone';

export class Pessoa {
    IdPessoa: string;
    TipoPessoa: string;
    NomeRazao: string;
    ApelidoFantasia: string;
    CpfCnpj: string;
    RgInscricao: string;
    DataNascimento: Date;
    Genero: string;
    Inativo: boolean;
    DataInclusao: Date;
    Vinculos: string[];
    Enderecos: endereco[];
    Telefones: telefone[];
    Emails: email[];

    constructor() {
        this.IdPessoa = '';
        this.TipoPessoa = '';
        this.NomeRazao = '';
        this.ApelidoFantasia = '';
        this.CpfCnpj = '';
        this.RgInscricao = '';
        this.DataNascimento = new Date(1900, 1, 1);
        this.Genero = '';
        this.Inativo = false;
        this.DataInclusao = new Date;
        this.Vinculos = [];
        this.Enderecos = [];
        this.Telefones = [];
        this.Emails = [];
    }

}



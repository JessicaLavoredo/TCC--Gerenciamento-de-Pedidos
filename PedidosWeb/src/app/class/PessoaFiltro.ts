
import { enderecoFitro } from './enderecoFiltro';
export class PessoaFiltro {
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
    Enderecos: enderecoFitro[];

    constructor() {
        this.IdPessoa = null;
        this.TipoPessoa = null;
        this.NomeRazao = null;
        this.ApelidoFantasia = null;
        this.CpfCnpj = null;
        this.RgInscricao = null;
        this.DataNascimento = null;
        this.Genero = null;
        this.Inativo = null;
        this.DataInclusao = null;
        this.Enderecos = [];
    }

}



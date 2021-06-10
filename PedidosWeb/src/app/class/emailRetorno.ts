import { CategoriaEmail } from "./categoria-email";

export class emailRetorno {
    Endereco: string;
    CategoriaEmail: CategoriaEmail;
    DescricaoCategoriaEmail: string;
    Observacao: string;
    IdCategoriaEmail: string;

    constructor() {
        this.Endereco = '';
        this.CategoriaEmail = new CategoriaEmail;
        this.Observacao = '';
        this.DescricaoCategoriaEmail = '';
        this.IdCategoriaEmail = '';
    }
}



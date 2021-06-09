import { CategoriaTelefone } from "./categoria-telefone";

export class telefoneRetorno {
    DDI: string;
    DDD: string;
    Numero: string;
    Ramal: string;
    CategoriaTelefone: CategoriaTelefone;
    Observacao: string;
    DescricaoCategoriaTelefone: String;
    IdCategoriaTelefone: string;

    constructor() {
        this.DDI = '';
        this.DDD = '';
        this.Numero = '';
        this.Ramal = '';
        this.CategoriaTelefone = new CategoriaTelefone;
        this.Observacao = '';
        this.DescricaoCategoriaTelefone = '';
        this.IdCategoriaTelefone = '';
    }

}

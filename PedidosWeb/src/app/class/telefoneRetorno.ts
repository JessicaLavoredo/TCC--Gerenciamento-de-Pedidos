import { CategoriaTelefone } from "./categoria-telefone";

export class telefoneRetorno {
    DDI: string;
    DDD: string;
    Numero: string;
    Ramal: string;
    CategoriaTelefone: CategoriaTelefone;
    Observacao: string;
    DecricaoCategoriaTelefone: String;

    constructor() {
        this.DDI = '';
        this.DDD = '';
        this.Numero = '';
        this.Ramal = '';
        this.CategoriaTelefone = new CategoriaTelefone;
        this.Observacao = '';
        this.DecricaoCategoriaTelefone = '';
    }

}

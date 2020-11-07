export class Cliente {
    public id: string;
    public tipo: string;
    public nomeRazao: string;
    public pelidoFantasia: string;
    public cPFCNPJ: string;
    public rGInscricao: string;
    public dataNascimento: string;
    public genero: string;
    public inativo: string;

    constructor(){
        this.id = '';
        this.tipo = '';
        this.nomeRazao = '';
        this.pelidoFantasia = '';
        this.cPFCNPJ = '';
        this.rGInscricao = '';
        this.dataNascimento = '';
        this.genero = '';
        this.inativo = '';
    }
}

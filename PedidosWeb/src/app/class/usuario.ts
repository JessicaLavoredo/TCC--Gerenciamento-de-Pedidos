export class Usuario {
    public idUsuario: string;
    public idPessoa: string;
    public login: string;
    public senha: string;
    public idPerfil: string;

    constructor() {
        this.idPerfil = '';
        this.idPessoa = '';
        this.idUsuario = '';
        this.login = '';
        this.senha = '';
    }

}
export class Usuario {
    public IdUsuario: string;
    public IdPessoa: string;
    public Login: string;
    public Senha: string;
    public IdPerfil: string;

    constructor() {
        this.IdPerfil = '';
        this.IdPessoa = '';
        this.IdUsuario = '';
        this.Login = '';
        this.Senha = '';
    }

}
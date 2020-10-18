import { isThisTypeNode } from 'typescript';

export class Usuario {
    public idUsuario: string;
    public idPessoa: string;
    public login: string;
    public senha: string;
    public idPerfil: string;
    public usuario: string;

    constructor(){
        this.idPerfil = '';
        this.idPessoa = '';
        this.idUsuario = '';
        this.login = '';
        this.senha = '';
        this.usuario = '';
    }
}

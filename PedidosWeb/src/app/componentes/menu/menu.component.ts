import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { PessoaService } from './../../services/pessoa.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  UsuarioLogado: string = "";
  admin = false;
  nomePaginaPessoa: string;
  nomePaginaPessoaRelatorio: string;
  gerent: boolean;
  constructor(private PessoaService: PessoaService, private accountService: AccountService, private router: Router, private UsuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.PreencherUsuarioLogado()
  }


  async PreencherUsuarioLogado() {
    const usuario = this.accountService.getUsuario();
    if (usuario) {
      let retornoUsuario: any = await this.UsuarioService.BuscarPorId(usuario);
      let retorno: any = await this.PessoaService.BuscarPorId(retornoUsuario.resultado.IdPessoa);
      if (retorno) {
        if (retorno.resultado.ApelidoFantasia == "" || retorno.resultado.ApelidoFantasia == null) {
          this.UsuarioLogado = retorno.resultado.NomeRazao;
        } else {
          this.UsuarioLogado = retorno.resultado.ApelidoFantasia;
        }
      }
      const perfil = this.accountService.getTipoUser();
      if (perfil == "1") {
        this.admin = true;
        this.gerent = true;
        this.nomePaginaPessoa = "Cadastro de Pessoa"
        this.nomePaginaPessoaRelatorio = "Relatório de Pessoa"
      } else if (perfil == "2") {
        this.admin = false;
        this.gerent = true;
        this.nomePaginaPessoa = "Cadastro de Pessoa"
        this.nomePaginaPessoaRelatorio = "Relatório de Pessoa"
      } else {
        this.nomePaginaPessoa = "Cadastro de Cliente"
        this.nomePaginaPessoaRelatorio = "Relatório de Cliente"
        this.admin = false;
        this.gerent = false;
      }
    }
  }

  public sair() {
    try {
      window.localStorage.removeItem('token');
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
  }
}

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
  constructor(private PessoaService: PessoaService, private accountService: AccountService, private router: Router,) { }

  ngOnInit(): void {
    this.PreencherUsuarioLogado()
  }


  async PreencherUsuarioLogado() {
    let usuario = window.localStorage.getItem("logado")
    let retorno: any = await this.PessoaService.BuscarPorId(usuario)
    if (retorno) {
      if (retorno.apelidoFantasia != '') {
        this.UsuarioLogado = retorno.apelidoFantasia;
      } else {
        this.UsuarioLogado = retorno.nomeRazao;
      }
    }
    let perfil = window.localStorage.getItem("perfil")
    if (perfil == "1") {
      this.admin = true;
      this.nomePaginaPessoa = "Cadastro de Pessoa"
    } else {
      this.admin = false;
      this.nomePaginaPessoa = "Cadastro de Cliente"
    }
  }

  public sair() {
    try {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('logado');
      window.localStorage.removeItem('perfil');
      console.log('saiu');
      this.router.navigate(['login']);
    } catch (error) {
      console.error(error);
    }
  }
}

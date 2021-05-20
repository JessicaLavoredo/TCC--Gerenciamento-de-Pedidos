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
    const usuario = this.accountService.getUsuario();
    if (usuario) {
      let retorno: any = await this.PessoaService.BuscarPorId(usuario)
      if (retorno) {
        if (retorno.ApelidoFantasia != '') {
          this.UsuarioLogado = retorno.ApelidoFantasia;
        } else {
          this.UsuarioLogado = retorno.NomeRazao;
        }
      }
      const perfil = this.accountService.getTipoUser();
      if (perfil == "1") {
        this.admin = true;
        this.nomePaginaPessoa = "Cadastro de Pessoa"
      } else {
        this.admin = false;
        this.nomePaginaPessoa = "Cadastro de Cliente"
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

import { Component, OnInit } from '@angular/core';
import { PessoaService } from './../../services/pessoa.service';
import { FormControl } from '@angular/forms';
import { PerfilUsuario } from './../../class/perfil-usuario';
import { UsuarioService } from './../../services/usuario.service';
import { PerfilUsuarioService } from './../../services/perfil-usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/class/usuario';
import { Pessoa } from 'src/app/class/Pessoa';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AlertService } from './../../services/alert.service';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  public Usuario: Usuario = new Usuario();
  NomePessoa: string = '';
  ConfirmacaoSenha: string = '';
  SenhaNova: string = '';
  SenhaAtual: string = '';

  constructor(private UsuarioService: UsuarioService, private accountService: AccountService, private AlertService: AlertService, private PessoaService: PessoaService) { }

  ngOnInit(): void {
    this.Limpar();
    this.carregartela()
  }

  public async carregartela() {
    const usuario = this.accountService.getUsuario();
    if (usuario) {
      let retorno: any = await this.UsuarioService.BuscarPorId(usuario)
      if (retorno) {
        this.Usuario = retorno
      }
    }
  }


  public async Gravar() {
    try {
      if (this.SenhaAtual == '') {
        this.AlertService.show("Preenha o campo Corretamente: Senha Atual", { classname: 'bg-danger text-light', delay: 3000 });
        return
      }
      if (this.SenhaNova == '') {
        this.AlertService.show("Preenha o campo Corretamente: Nova Senha", { classname: 'bg-danger text-light', delay: 3000 });
        return
      }

      if (this.ConfirmacaoSenha == '') {
        this.AlertService.show("Preenha o campo Corretamente: Confirmação de Senha", { classname: 'bg-danger text-light', delay: 3000 });
        return
      }

      if (this.SenhaAtual != this.Usuario.Senha) {
        this.AlertService.show("Senha atual inválida", { classname: 'bg-danger text-light', delay: 3000 });
        return
      }
      if (this.SenhaNova != this.ConfirmacaoSenha) {
        this.AlertService.show("As senhas não conferem", { classname: 'bg-warning text-light', delay: 3000 });
        return
      }

      this.Usuario.Senha = this.SenhaNova;
      let retorno: any = await this.UsuarioService.gravar(this.Usuario)
      if (retorno.status == 200) {
        this.AlertService.show("Senha alterada com sucesso", { classname: 'bg-success text-light', delay: 3000 });
        this.ConfirmacaoSenha = '';
        this.SenhaNova = '';
        this.SenhaAtual = '';
      } else {
        this.AlertService.show("Erro ao alterar senha", { classname: 'bg-danger text-light', delay: 3000 });
      }

      this.Limpar();
    } catch (error) {
      console.error(error);
    }
  }
  Limpar() {
    this.Usuario = new Usuario();
    this.NomePessoa = '';
  }

}


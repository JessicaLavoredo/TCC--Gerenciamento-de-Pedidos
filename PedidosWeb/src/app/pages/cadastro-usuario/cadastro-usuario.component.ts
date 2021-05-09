import { PessoaService } from './../../services/pessoa.service';
import { FormControl } from '@angular/forms';
import { PerfilUsuario } from './../../class/perfil-usuario';
import { UsuarioService } from './../../services/usuario.service';
import { PerfilUsuarioService } from './../../services/perfil-usuario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/class/usuario';
import { Pessoa } from 'src/app/class/Pessoa';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChild('modalSearch') modalSearch: ElementRef;
  public paginaAtual = 1;
  botao: boolean = false;
  public Usuario: Usuario = new Usuario();
  NomePessoa: string = '';
  ConfirmacaoSenha: string = '';
  Perfis: PerfilUsuario[] = [];
  public filter;
  Perfil: PerfilUsuario = new PerfilUsuario();
  public Pessoas: Pessoa[] = [];
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;
  queryUsuario = new FormControl();
  queryPessoa = new FormControl();
  resultados: Observable<any>;

  constructor(private UsuarioService: UsuarioService, private PerfilUsuarioService: PerfilUsuarioService, private AlertService: AlertService, private PessoaService: PessoaService) { }

  ngOnInit(): void {
    this.listarPerfil();
    this.Limpar();
  }

  public DepoisBuscar() {
    this.queryUsuario.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.UsuarioService.BuscarPorId(this.Usuario.idUsuario)),
      map((result: any) => {
        if (result) {
          this.Usuario = result
          this.ConfirmacaoSenha = result.senha;
          this.pesquisarFuncionario();
        } else {

        }
      }
      )
    ).subscribe();
  }


  public listarPerfil() {
    this.PerfilUsuarioService.buscarTodos().subscribe(result => {
      this.Perfis = result;
    });
  }

  Pesquisar() {
    this.modalSearch.nativeElement.click();
  }

  handlePageChange(event) {
    this.paginaAtual = event;
  }

  public async Gravar() {
    try {
      if (this.Usuario.senha === this.ConfirmacaoSenha) {
        let retorno = await this.UsuarioService.gravar(this.Usuario)
        this.AlertService.show(retorno.data, { classname: 'bg-success text-light', delay: 3000 });
        this.Limpar();
      } else {

      }
    } catch (error) {
      console.error(error);
    }
  }
  Limpar() {
    this.Usuario = new Usuario();
    this.NomePessoa = '';
    this.PesquisaReativaFuncionario();
    this.DepoisBuscar()
  }

  PesquisaReativaFuncionario() {
    this.queryPessoa.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.Usuario.idPessoa)),
      map((result: any) => {
        if (result) {
          this.NomePessoa = result.nomeRazao;
        }
      }
      )
    ).subscribe();
  }

  async pesquisarFuncionario() {
    if (this.Usuario.idPessoa == '') {
      this.ListarTodasPessoas();
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.Usuario.idPessoa)
      if (retorno) {
        this.NomePessoa = retorno.nomeRazao;
      }
    }
  }

  public ListarTodasPessoas() {
    this.UsuarioService.buscarTodosFuncionarios().subscribe(result => {
      this.Pessoas = result;
    });
  }
}

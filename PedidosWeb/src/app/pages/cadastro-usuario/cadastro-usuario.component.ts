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
  public Usuarios: Usuario[] = [];
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;
  @ViewChild('ModalSearchUsuario') ModalSearchUsuario: ElementRef;
  queryUsuario = new FormControl();
  queryPessoa = new FormControl();
  resultados: Observable<any>;
  FiltroPesquisa: string;
  InputFiltroPesquisa: string;
  Filtros: any[];
  FiltroPesquisaUsuario: string;
  InputFiltroPesquisaUsuario: string;
  FiltrosUsuario: any[];
  validacao: boolean;


  constructor(private UsuarioService: UsuarioService, private PerfilUsuarioService: PerfilUsuarioService, private AlertService: AlertService, private PessoaService: PessoaService) { }

  ngOnInit(): void {
    this.listarPerfil();
    this.Limpar();
    this.PreecherComboFiltro()
    this.PreecherComboFiltroUsuario()
  }

  public DepoisBuscar() {
    this.queryUsuario.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.UsuarioService.BuscarPorId(this.Usuario.IdUsuario)),
      map((result: any) => {
        if (result == "Codigo Indefinido") {
          this.Usuario = new Usuario;
          this.ConfirmacaoSenha = '';
        } else
          if (result.status == 200) {
            this.Usuario = result.resultado
            this.ConfirmacaoSenha = result.resultado.Senha;
            this.pesquisarFuncionario();
          } else {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.Usuario = new Usuario;
            this.ConfirmacaoSenha = '';
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

  handlePageChange(event) {
    this.paginaAtual = event;
  }

  public async Gravar() {
    try {
      this.validacao = true;

      if (this.Usuario.IdUsuario == '') {
        this.Usuario.IdUsuario = null;
      }
      if (this.Usuario.IdPessoa == '') {
        this.AlertService.show("Preenche corretamente o campo Funcionário", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }
      if (this.Usuario.Login == '') {
        this.AlertService.show("Preenche corretamente o campo Login", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.Usuario.Senha == '') {
        this.AlertService.show("Preenche corretamente o campo Senha", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.ConfirmacaoSenha == '') {
        this.AlertService.show("Preenche corretamente o campo Confirmação de senha", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (!this.validacao) {
        return
      }
      if (this.Usuario.Senha === this.ConfirmacaoSenha) {
        let IdUsuario;
        IdUsuario = this.Usuario.IdUsuario

        let retorno: any = await this.UsuarioService.gravar(this.Usuario)
        if (retorno.status == 200) {
          if (IdUsuario == '' || IdUsuario == null) {
            this.UsuarioService.buscarTodos().subscribe(result => {
              this.AlertService.show('Registro ' + result.pop().IdUsuario + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
            });
          } else {
            this.AlertService.show('Registro ' + IdUsuario + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
          }
        } else {
          this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
        }
        this.Limpar();
      } else {
        this.AlertService.show("As senhas não conferem", { classname: 'bg-warning text-light', delay: 3000 });
      }
    } catch (error) {
      console.error(error);
    }
  }
  Limpar() {
    this.Usuario = new Usuario();
    this.NomePessoa = '';
    this.ConfirmacaoSenha = '';
    this.FiltroPesquisaUsuario = "P";
    this.PesquisaReativaFuncionario();
    this.DepoisBuscar()

  }

  PesquisaReativaFuncionario() {
    this.queryPessoa.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.Usuario.IdPessoa)),
      map((result: any) => {
        if (result == "Codigo Indefinido") {
          this.NomePessoa = '';
          this.Usuario.IdPessoa = '';
        } else
          if (result.status == 200) {
            this.NomePessoa = result.resultado.NomeRazao;
          } else {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.NomePessoa = '';
            this.Usuario.IdPessoa = '';
          }

      }
      )
    ).subscribe();
  }

  async pesquisarFuncionario() {
    if (this.Usuario.IdPessoa == '') {
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.Usuario.IdPessoa)
      if (retorno) {
        this.NomePessoa = retorno.NomeRazao;
      }
    }
  }

  async PesquisarUsuario() {
    if (this.Usuario.IdUsuario == '') {
      this.ModalSearchUsuario.nativeElement.click();
    } else {
      let retorno: any = await this.UsuarioService.BuscarPorId(this.Usuario.IdUsuario)
      if (retorno) {
        this.Usuario = retorno
      }
    }
  }

  public PreecherComboFiltro() {
    this.Filtros = [
      {
        Codigo: "NR",
        Descricao: "Nome/Razão Social"
      },
      {
        Codigo: "AF",
        Descricao: "Apelido/Nome Fantasia"
      },
      {
        Codigo: "C",
        Descricao: "CPF/CNPJ"
      }
    ]
  }

  public PreecherComboFiltroUsuario() {
    this.FiltrosUsuario = [
      {
        Codigo: "P",
        Descricao: "Perfil"
      },
      {
        Codigo: "L",
        Descricao: "Login"
      },
      {
        Codigo: "F",
        Descricao: "Funcionario"
      }

    ]
  }


  async PesquisarFuncionarioPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisa == "NR") {
      pesquisa = { NomeRazao: this.InputFiltroPesquisa }
    } else if (this.FiltroPesquisa == "AF") {
      pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa }
    } else if (this.FiltroPesquisa == "C") {
      pesquisa = { CpfCnpj: this.InputFiltroPesquisa }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    this.Pessoas = retorno.resultado
  }

  async PesquisarUsuarioPorFiltro() {
    this.Usuarios = [];
    let pesquisa: any;
    let pesquisaPerfil: any;
    let pesquisaFunc: any;
    if (this.FiltroPesquisaUsuario == "P") {
      pesquisaPerfil = { Nome: this.InputFiltroPesquisaUsuario };
      let retornoPerfil: any = await this.UsuarioService.BuscarPerfilPorFiltro(pesquisaPerfil);
      if (retornoPerfil.resultado[0]) {
        pesquisa = { IdPerfil: retornoPerfil.resultado[0].IdPerfil }
      }
    } else if (this.FiltroPesquisaUsuario == "L") {
      pesquisa = { Login: this.InputFiltroPesquisaUsuario }
    } else if (this.FiltroPesquisaUsuario == "F") {
      pesquisaFunc = { NomeRazao: this.InputFiltroPesquisaUsuario };
      let retornoFunc: any = await this.PessoaService.BuscarPorFiltro(pesquisaFunc);
      if (retornoFunc.resultado.length > 0) {
        retornoFunc.resultado.forEach(async resultado => {
          pesquisa = { IdPessoa: resultado.IdPessoa }
          let retorno: any = await this.UsuarioService.BuscarUsuarioPorFiltro(pesquisa);
          if (retorno.resultado[0]) {
            let resultUsuario: any = retorno.resultado[0]
            resultUsuario.NomePessoa = resultado.NomeRazao
            if (retorno.resultado[0].IdPerfil == 1) {
              resultUsuario.NomePerfil = "Administrador"
            } else if (retorno.resultado[0].IdPerfil == 2) {
              resultUsuario.NomePerfil = "Gerente"
            } else if (retorno.resultado[0].IdPerfil == 3) {
              resultUsuario.NomePerfil = "Vendedor"
            }
            this.Usuarios.push(resultUsuario);
          }
        });
        return
      }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.UsuarioService.BuscarUsuarioPorFiltro(pesquisa);
    retorno.resultado.forEach(async resultado => {
      let resultUsuario: any = resultado
      if (resultUsuario.IdPerfil == 1) {
        resultUsuario.NomePerfil = "Administrador"
      } else if (resultUsuario.IdPerfil == 2) {
        resultUsuario.NomePerfil = "Gerente"
      } else if (resultUsuario.IdPerfil == 3) {
        resultUsuario.NomePerfil = "Vendedor"
      };
      let retornoFunc: any = await this.PessoaService.BuscarPorId(resultado.IdPessoa);
      resultUsuario.NomePessoa = retornoFunc.NomeRazao

      this.Usuarios.push(resultUsuario)
    });

  }

  public selecionarPessoa(Pessoa: Pessoa) {
    if (Pessoa) {
      this.Usuario.IdPessoa = Pessoa.IdPessoa;
      this.pesquisarFuncionario()
      this.PesquisaReativaFuncionario()

    }
  }

  public selecionarUsuario(Usuario: any) {
    if (Usuario) {
      this.Usuario.IdUsuario = Usuario.IdUsuario;
    }
  }



}

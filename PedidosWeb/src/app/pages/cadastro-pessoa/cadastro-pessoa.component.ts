import { CategoriaEndereco } from './../../class/categoria-endereco';
import { CategoriaEnderecoService } from './../../services/categoria-endereco.service';
import { Observable } from 'rxjs';
import { Estado } from './../../class/estado';
import { emailRetorno } from './../../class/emailRetorno';
import { telefoneRetorno } from './../../class/telefoneRetorno';
import { enderecoRetorno } from './../../class/enderecoRetorno';
import { Vinculo } from './../../class/vinculo';
import { endereco } from './../../class/endereco';
import { Cidade } from './../../class/cidade';
import { PessoaService } from './../../services/pessoa.service';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriaEmail } from 'src/app/class/categoria-email';
import { CategoriaTelefone } from 'src/app/class/categoria-telefone';
import { Pessoa } from 'src/app/class/Pessoa';
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { AlertService } from './../../services/alert.service';
import { cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { formatDate } from '@angular/common';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ThrowStmt } from '@angular/compiler';
import { AccountService } from './../../services/account.service';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  NomePagina: string = "";
  public paginaAtual = 1;
  public paginaAtualPessoa = 1;
  public paginaAtualP = 1;
  public Cidades: Cidade[] = [];
  public cidade: Cidade = new Cidade();
  public filter;
  public categoriasEndereco: CategoriaEndereco[] = [];
  public categoriasEmail: CategoriaEmail[] = [];
  public categoriasTelefone: CategoriaTelefone[] = [];
  public Pessoa: Pessoa = new Pessoa();
  public PessoaFiltro: Pessoa = new Pessoa();
  public Pessoas: Pessoa[] = [];
  public enderecos: enderecoRetorno[] = [];
  public Endereco: enderecoRetorno = new enderecoRetorno();
  public telefone: telefoneRetorno = new telefoneRetorno();
  public telefones: telefoneRetorno[] = [];
  public email: emailRetorno = new emailRetorno();
  public emails: emailRetorno[] = [];
  public Vinculos: Vinculo[] = [];
  public VinculosTetorno: Vinculo[] = [];
  public isJuridico = false;
  public labelNome = 'Nome';
  public labelFantasia = 'Apelido';
  public labelCPFCNPJ = 'CPF';
  public labelRGIE = 'RG';
  public cpfMask = '000.000.000-00';
  public rgMask = '00.000.000-0';
  public desativado = false;
  public botao: boolean = false;
  public filtros: any;
  FiltroPesquisa: string;
  InputFiltroPesquisa: string;
  Filtros: any[];
  FiltroPesquisaCidade: string;
  InputFiltroPesquisaCidade: string;
  FiltrosCidade: any[];
  dataNascimento: Date;
  queryCidade = new FormControl();
  queryPessoa = new FormControl();
  resultados: Observable<any>;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  perfil: string = '';
  Idpessoa: string = '';
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;
  @ViewChild('modalSearchCidade') modalSearchCidade: ElementRef;
  validacao: boolean;
  formControl: string[];
  CatEndereco: string;
  constructor(private PessoaService: PessoaService, private route: ActivatedRoute, private router: Router, private AlertService: AlertService, private accountService: AccountService, private localeService: BsLocaleService) {

  }

  ngOnInit(): void {
    this.limparTela();
    this.dpConfig.isAnimated = true;
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.localeService.use('pt-br');
    if (this.Idpessoa != '') {
      this.Pessoa.IdPessoa = this.Idpessoa
    }

    this.route.queryParams
      .subscribe(params => {
        if (params) {
          this.Pessoa.IdPessoa = params.id ? params.id : '';
        }
      }
      );

    this.DepoisBuscar();
  }

  limparTela() {
    this.CatEndereco = '';
    this.filter = '';
    this.Pessoa = new Pessoa();
    this.listarCatEndereco();
    this.listarCatEmail();
    this.listarCatTelefone();
    this.Pessoa.IdPessoa = '';
    this.enderecos = [];
    this.Endereco = new enderecoRetorno();
    this.telefone = new telefoneRetorno();
    this.telefones = [];
    this.email = new emailRetorno();
    this.emails = [];
    this.Vinculos = [];
    this.Pessoa.TipoPessoa = 'F';
    this.telefone.DDI = '55'
    this.dataNascimento = null;
    this.alterartipo();
    this.desativado = false;
    this.listarVinculo();
    this.filtros = {};
    this.ValidarUsuario()
    // this.DepoisBuscar();
  }

  public DepoisBuscar() {
    this.queryPessoa.valueChanges.pipe(
      // filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.Pessoa.IdPessoa)),
      map((retorno: any) => {
        if (retorno == "Codigo Indefinido") {
          this.limparTela();
        } else if (retorno) {
          if (retorno.status == 200) {
            this.Pessoa = retorno.resultado;
            this.dataNascimento = new Date(this.Pessoa.DataNascimento + " 00:00:00");
            this.telefones = retorno.resultado.Telefones.length > 0 ? retorno.resultado.Telefones : [];
            this.enderecos = retorno.resultado.Enderecos.length > 0 ? retorno.resultado.Enderecos : [];
            this.emails = retorno.resultado.Emails.length > 0 ? retorno.resultado.Emails : [];
            this.alterartipo();
          } else {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.limparTela();
            return
          }
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
          this.limparTela();
          return
        }
      }
      )
    ).subscribe();

    this.queryCidade.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarCidadePorId(this.Endereco.Cidade.IdCidade)),
      map((retorno: any) => {
        if (retorno == "Codigo Indefinido") {
          this.Endereco.Cidade.IdCidade = '';
          this.Endereco.Cidade.Nome = '';
        } else if (retorno) {
          if (retorno.status == 200) {
            this.Endereco.Cidade.IdCidade = retorno.resultado.IdCidade;
            this.Endereco.Cidade.Nome = retorno.resultado.Nome;
          } else {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.Endereco.Cidade.IdCidade = '';
            this.Endereco.Cidade.Nome = '';
          }
        }
      }
      )
    ).subscribe();
  }

  async PesquisarCidade() {
    if (this.Endereco.Cidade.IdCidade == '' || !this.Endereco.Cidade.IdCidade) {
      this.PreecherComboCidade()
      this.modalSearchCidade.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarCidadePorId(this.Endereco.Cidade.IdCidade);
      this.Endereco.Cidade.IdCidade = retorno.IdCidade;
      this.Endereco.Cidade.Nome = retorno.Nome
    }


  }

  public ListarTodasPessoas() {
    this.PessoaService.buscarTodos().subscribe(result => {
      this.Pessoas = result;
    });
  }

  public selecionarCidade(Cidade: Cidade) {
    if (Cidade) {
      this.Endereco.Cidade.IdCidade = Cidade.IdCidade;
      this.Endereco.Cidade.Nome = Cidade.Nome;
    }
  }

  public selecionarPessoa(Pessoa: Pessoa) {
    if (Pessoa) {
      this.Pessoa.IdPessoa = Pessoa.IdPessoa;
    }
    this.Pesquisar();
  }

  public listarCatEndereco() {
    this.PessoaService.buscarTodosCatEnderecos().subscribe(result => {
      this.categoriasEndereco = result;
    });
  }

  public listarCatEmail() {
    this.PessoaService.buscarTodosCatEmails().subscribe(result => {
      this.categoriasEmail = result;
    });

  }

  public listarCatTelefone() {
    this.PessoaService.buscarTodosCatTelefones().subscribe(result => {
      this.categoriasTelefone = result;
    });

  }

  public listarVinculo() {
    this.PessoaService.buscarTodosVinculos().subscribe(result => {
      this.Vinculos = result;
    });
  }

  public async Gravar() {
    try {
      this.validacao = true;
      if (this.Pessoa.TipoPessoa == 'F' && !cpf.isValid(this.Pessoa.CpfCnpj)) {
        this.AlertService.show("Cpf Inválido", { classname: 'bg-danger text-light', delay: 3000 });
        this.Pessoa.CpfCnpj = '';
        this.validacao = false;
      }


      if (this.Pessoa.TipoPessoa == 'J' && !cnpj.isValid(this.Pessoa.CpfCnpj)) {
        this.AlertService.show("Cnpj Inválido", { classname: 'bg-danger text-light', delay: 3000 });
        this.Pessoa.CpfCnpj = '';
        this.validacao = false;
      }

      if (this.Pessoa.NomeRazao == '') {
        this.AlertService.show("Preencha corretamente o campo " + this.labelNome, { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.perfil == "3") {
        this.Pessoa.Vinculos.push(2)
      }

      if (this.Pessoa.Vinculos.length <= 0) {
        this.AlertService.show("Preencha corretamente o campo Cargo", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.enderecos.length <= 0) {
        this.AlertService.show("Informe pelo menos um endereço", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.telefones.length <= 0) {
        this.AlertService.show("Informe pelo menos um telefone", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (!this.validacao) {
        return
      }

      if (this.Pessoa.IdPessoa == '') {
        this.Pessoa.IdPessoa = null;
      }
      this.Pessoa.DataNascimento = this.dataNascimento;

      this.Pessoa.Enderecos = this.enderecos;
      this.Pessoa.Telefones = this.telefones;
      this.Pessoa.Emails = this.emails;

      for (let x = 0; x < this.enderecos.length; x++) {
        this.Pessoa.Enderecos[x].IdCategoriaEndereco = this.enderecos[x].CategoriaEndereco.IdCategoriaEndereco;
        this.Pessoa.Enderecos[x].IdCidade = this.enderecos[x].Cidade.IdCidade;
      }
      for (let x = 0; x < this.telefones.length; x++) {
        this.Pessoa.Telefones[x].IdCategoriaTelefone = this.telefones[x].CategoriaTelefone.IdCategoriaTelefone;
      }

      for (let x = 0; x < this.emails.length; x++) {
        this.Pessoa.Emails[x].IdCategoriaEmail = this.emails[x].CategoriaEmail.IdCategoriaEmail;
      }

      if (this.Pessoa.TipoPessoa == 'J') {
        this.dataNascimento = null;
        this.Pessoa.Genero = null;
      }

      let idPessoa;
      idPessoa = this.Pessoa.IdPessoa

      let retorno: any = await this.PessoaService.gravar(this.Pessoa);
      if (retorno.status == 200) {
        if (idPessoa == '' || idPessoa == null) {
          this.PessoaService.buscarTodos().subscribe(result => {
            this.AlertService.show('Registro ' + result.pop().IdPessoa + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
          });
        } else {
          this.AlertService.show('Registro ' + idPessoa + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
        }
        this.limparTela();
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }

    } catch (error) {
      console.error(error);
    }
  }

  public async AlterarStatus() {
    try {
      this.validacao = true;
      if (this.Pessoa.TipoPessoa == 'F' && !cpf.isValid(this.Pessoa.CpfCnpj)) {
        this.AlertService.show("Cpf Inválido", { classname: 'bg-danger text-light', delay: 3000 });
        this.Pessoa.CpfCnpj = '';
        this.validacao = false;
      }

      if (this.Pessoa.TipoPessoa == 'J' && !cnpj.isValid(this.Pessoa.CpfCnpj)) {
        this.AlertService.show("Cnpj Inválido", { classname: 'bg-danger text-light', delay: 3000 });
        this.Pessoa.CpfCnpj = '';
        this.validacao = false;
      }

      if (this.Pessoa.NomeRazao == '') {
        this.AlertService.show("Preencha corretamente o campo " + this.labelNome, { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.perfil == "3") {
        this.Pessoa.Vinculos.push(2)
      }

      if (this.Pessoa.Vinculos.length <= 0) {
        this.AlertService.show("Preencha corretamente o campo Cargo", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.enderecos.length <= 0) {
        this.AlertService.show("Informe pelo menos um endereço", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.telefones.length <= 0) {
        this.AlertService.show("Informe pelo menos um telefone", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (!this.validacao) {
        return
      }

      if (this.Pessoa.IdPessoa == '') {
        this.Pessoa.IdPessoa = null;
      }
      this.Pessoa.DataNascimento = this.dataNascimento;

      this.Pessoa.Enderecos = this.enderecos;
      this.Pessoa.Telefones = this.telefones;
      this.Pessoa.Emails = this.emails;

      for (let x = 0; x < this.enderecos.length; x++) {
        this.Pessoa.Enderecos[x].IdCategoriaEndereco = this.enderecos[x].CategoriaEndereco.IdCategoriaEndereco;
        this.Pessoa.Enderecos[x].IdCidade = this.enderecos[x].Cidade.IdCidade;
      }
      for (let x = 0; x < this.telefones.length; x++) {
        this.Pessoa.Telefones[x].IdCategoriaTelefone = this.telefones[x].CategoriaTelefone.IdCategoriaTelefone;
      }

      for (let x = 0; x < this.emails.length; x++) {
        this.Pessoa.Emails[x].IdCategoriaEmail = this.emails[x].CategoriaEmail.IdCategoriaEmail;
      }

      let retorno: any = await this.PessoaService.gravar(this.Pessoa);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
        this.limparTela();
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }

    } catch (error) {
      console.error(error);
    }
  }

  public async AdicionarEndereco() {
    if (this.Endereco.Logradouro == '') {
      this.AlertService.show("Preencha corretamente o campo Logradouro", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }
    if (this.Endereco.Numero == '') {
      this.AlertService.show("Preencha corretamente o campo Número", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.Endereco.Bairro == '') {
      this.AlertService.show("Preencha corretamente o campo Bairro", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.Endereco.CEP == '') {
      this.AlertService.show("Preencha corretamente o campo CEP", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }


    if (this.Endereco.Cidade.IdCidade == '') {
      this.AlertService.show("Preencha corretamente o campo Cidade", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.Endereco.CategoriaEndereco.IdCategoriaEndereco == '') {
      this.AlertService.show("Preencha corretamente o campo Categoria", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }
    if (this.Endereco.CategoriaEndereco.IdCategoriaEndereco == null) {
      this.Endereco.CategoriaEndereco.IdCategoriaEndereco = "1";
      this.Endereco.CategoriaEndereco.Nome = "Padrão";
    }

    this.enderecos.push(this.Endereco)
    this.Endereco = new enderecoRetorno();
  }

  public selecionarEndereco(Endereco: enderecoRetorno) {
    if (Endereco) {
      this.Endereco = Endereco;
      this.Endereco.CategoriaEndereco.Nome = Endereco.CategoriaEndereco.Nome
      Endereco = new enderecoRetorno();
    }
  }

  public excluirEndereco(Endereco: enderecoRetorno) {
    if (Endereco) {
      this.enderecos.splice(this.enderecos.indexOf(Endereco), 1)
    }
  }

  public SelecionarCategoriaEndereco() {
    this.categoriasEndereco.forEach(CatEndereco => {
      if (CatEndereco.IdCategoriaEndereco == this.Endereco.CategoriaEndereco.IdCategoriaEndereco) {
        this.Endereco.CategoriaEndereco.Nome = CatEndereco.Nome;
      }
    })
  }

  public limparEndereco() {
    this.Endereco = new enderecoRetorno();
  }

  public selecionarTelefone(Telefone: telefoneRetorno) {
    if (Telefone) {
      this.telefone = Telefone;
      Telefone = new telefoneRetorno();
    }
  }

  public async AdicionarTelefone() {
    if (this.telefone.DDI == '') {
      this.AlertService.show("Preencha corretamente o campo DDI", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.telefone.DDD == '') {
      this.AlertService.show("Preencha corretamente o campo DDD", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.telefone.Numero == '') {
      this.AlertService.show("Preencha corretamente o campo Número", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.telefone.CategoriaTelefone.IdCategoriaTelefone == '') {
      this.AlertService.show("Preencha corretamente o campo Categoria de Telefone", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.telefone.CategoriaTelefone.IdCategoriaTelefone == null) {
      this.telefone.CategoriaTelefone.IdCategoriaTelefone = "1";
      this.telefone.CategoriaTelefone.Nome = "Padrão";
    }

    this.telefones.push(this.telefone)
    this.telefone = new telefoneRetorno();
  }

  public excluirTelefone(Telefone: telefoneRetorno) {
    if (Telefone) {
      this.telefones.splice(this.telefones.indexOf(Telefone), 1)
    }
  }

  public SelecionarCategoriaTelefone() {
    this.categoriasTelefone.forEach(CatTelefone => {
      if (CatTelefone.IdCategoriaTelefone == this.telefone.CategoriaTelefone.IdCategoriaTelefone) {
        this.telefone.CategoriaTelefone.Nome = CatTelefone.Nome;
      }
    })
  }

  public limparTelefone() {
    this.telefone = new telefoneRetorno();
  }


  public async AdicionarEmail() {
    if (!this.validEmail(this.email.Endereco)) {
      this.AlertService.show("Preencha corretamente o campo Endereço de Email", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.email.CategoriaEmail.IdCategoriaEmail == '') {
      this.AlertService.show("Preencha corretamente o campo Categoria de Email", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }

    if (this.email.CategoriaEmail.IdCategoriaEmail == null) {
      this.email.CategoriaEmail.IdCategoriaEmail = "1";
      this.email.CategoriaEmail.Nome = "Padrão";
    }
    this.email.CategoriaEmail.IdCategoriaEmail == '1';
    this.email.IdCategoriaEmail == '1';
    console.log(this.email)
    this.emails.push(this.email)
    this.email = new emailRetorno();
  }

  public selecionarEmail(Email: emailRetorno) {
    if (Email) {
      this.email = Email;
      Email = new emailRetorno();
    }
  }

  public excluirEmail(Email: emailRetorno) {
    if (Email) {
      this.emails.splice(this.emails.indexOf(Email), 1)
    }
  }

  public SelecionarCategoriaEmail() {
    this.categoriasEmail.forEach(CatEmail => {
      if (CatEmail.IdCategoriaEmail == this.email.CategoriaEmail.IdCategoriaEmail) {
        this.email.CategoriaEmail.Nome = CatEmail.Nome;
      }
    })
  }

  public limparEmail() {
    this.email = new emailRetorno();
  }

  public alterartipo() {
    if (this.Pessoa.TipoPessoa == 'F') {
      this.isJuridico = false;
      this.labelNome = 'Nome';
      this.labelFantasia = 'Apelido';
      this.labelCPFCNPJ = 'CPF';
      this.labelRGIE = 'RG';
      this.cpfMask = '000.000.000-00';
      this.rgMask = '00.000.000-0';
    } else {
      this.isJuridico = true;
      this.labelNome = 'Razão Social';
      this.labelFantasia = 'Nome Fantasia';
      this.labelCPFCNPJ = 'CNPJ';
      this.labelRGIE = 'Inscrição Estadual';
      this.rgMask = '9999999999-0';
      this.cpfMask = '00.000.000/0000-00';
    }
  }

  handlePageChange(event) {
    this.paginaAtual = event;
  }
  handlePageChangePessoa(event) {
    this.paginaAtualPessoa = event;
  }

  async buscarPorCep() {
    if (this.Endereco.CEP.length == 8) {
      let retorno: any = await this.PessoaService.buscaPorCEP(this.Endereco.CEP);
      if (retorno.logradouro != '') {
        this.Endereco.Logradouro = retorno.logradouro;
      }
      if (retorno.logradouro != '') {
        this.Endereco.Bairro = retorno.bairro;
      }
      if (retorno.ibge) {
        let CodigoIBGE = { CodigoIBGE: retorno.ibge }
        let CidadeRetorno: any = await this.PessoaService.BuscarCidadePorFiltro(CodigoIBGE);

        this.Endereco.Cidade.IdCidade = CidadeRetorno.resultado[0].IdCidade;
        this.Endereco.Cidade.Nome = CidadeRetorno.resultado[0].Nome;
      }
    }

  }

  async Pesquisar() {
    if (this.Pessoa.IdPessoa == '') {
      this.PreecherComboFiltro();
      this.FiltroPesquisa = "NR";
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.Pessoa.IdPessoa)
      if (retorno) {
        if (retorno.status == 200) {
          this.Pessoa = retorno.resultado;
          this.dataNascimento = new Date(this.Pessoa.DataNascimento + " 00:00:00");
          this.telefones = retorno.resultado.Telefones.length > 0 ? retorno.resultado.Telefones : [];
          this.enderecos = retorno.resultado.Enderecos.length > 0 ? retorno.resultado.Enderecos : [];
          this.emails = retorno.resultado.Emails.length > 0 ? retorno.resultado.Emails : [];
          this.alterartipo();
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
          this.limparTela();
        }

      } else {
        this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
        this.limparTela();
      }
    }
    this.DepoisBuscar()
  }

  public ValidarUsuario() {
    this.perfil = this.accountService.getTipoUser();
    if (this.perfil == "3") {
      this.NomePagina = "Cadastro de Cliente"
    } else {
      this.NomePagina = "Cadastro de Pessoa"
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

  public PreecherComboCidade() {
    this.FiltrosCidade = [
      {
        Codigo: "N",
        Descricao: "Nome"
      },
      {
        Codigo: "C",
        Descricao: "Código"
      },
      {
        Codigo: "CI",
        Descricao: "Código IBGE"
      }

    ]
  }

  async PesquisarUsuarioPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisa == "NR") {
      if (this.perfil == "3") {
        pesquisa = { NomeRazao: this.InputFiltroPesquisa, Vinculos: [2] }
      } else {
        pesquisa = { NomeRazao: this.InputFiltroPesquisa }
      }
    } else if (this.FiltroPesquisa == "AF") {
      if (this.perfil == "3") {
        pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa, Vinculos: [2] }
      } else {
        pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa }
      }
    } else if (this.FiltroPesquisa == "C") {
      if (this.perfil == "3") {
        pesquisa = { CpfCnpj: this.InputFiltroPesquisa, Vinculos: [2] }
      } else {
        pesquisa = { CpfCnpj: this.InputFiltroPesquisa }
      }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    this.Pessoas = retorno.resultado
  }

  async PesquisarCidadePorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisaCidade == "N") {
      pesquisa = { Nome: this.InputFiltroPesquisaCidade }
    } else if (this.FiltroPesquisaCidade == "C") {
      pesquisa = { IdCidade: this.InputFiltroPesquisaCidade }
    } else if (this.FiltroPesquisaCidade == "CI") {
      pesquisa = { CodigoIBGE: this.InputFiltroPesquisaCidade }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarCidadePorFiltro(pesquisa);
    let Cidades: Cidade[] = retorno.resultado;

    this.Cidades = Cidades;
  }


  validEmail(email) {
    let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    return regex_validation.test(email)
  }

}

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
import { CategoriaEndereco } from 'src/app/class/categoria-endereco';
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
  dataNascimento: Date;
  queryCidade = new FormControl();
  queryPessoa = new FormControl();
  resultados: Observable<any>;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  perfil: string = '';
  Idpessoa: string = '';
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;
  @ViewChild('modalSearchCidade') modalSearchCidade: ElementRef;


  constructor(private PessoaService: PessoaService, private route: ActivatedRoute, private router: Router, private AlertService: AlertService, private accountService: AccountService, private localeService: BsLocaleService) {
  }

  ngOnInit(): void {
    this.limparTela();
    this.queryCidade.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      tap(value => this.filter = value),
    ).subscribe();
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
  }

  limparTela() {
    this.filter = '';
    this.Pessoa = new Pessoa();
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
    this.listarCatEndereco();
    this.listarCatEmail();
    this.listarCatTelefone();
    this.listarVinculo();
    this.ListarTodasCidades();
    this.filtros = {};
    this.ValidarUsuario()
    this.PreecherComboFiltro();
    this.DepoisBuscar();
  }

  public DepoisBuscar() {
    this.queryPessoa.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.Pessoa.IdPessoa)),
      map((retorno: any) => {
        if (retorno) {
          this.Pessoa = retorno;
          this.dataNascimento = new Date(this.Pessoa.DataNascimento + " 00:00:00")
          if (retorno.Inativo == 0) {
            this.Pessoa.Inativo = false;
          } else {
            this.Pessoa.Inativo = true;
          }
          this.telefones = retorno.Telefones.length > 0 ? retorno.Telefones : [];
          this.telefones.forEach(telefone => {
            var categoriaResult = this.categoriasTelefone.find(categoria => telefone.IdCategoriaTelefone == categoria.IdCategoriaTelefone)
            if (categoriaResult) {
              telefone.DecricaoCategoriaTelefone = categoriaResult.Nome;
            }
          });
          this.enderecos = retorno.Enderecos.length > 0 ? retorno.Enderecos : [];
          this.enderecos.forEach(endereco => {
            var categoriaResult = this.categoriasEndereco.find(categoria => categoria.IdCategoriaEndereco == endereco.IdCategoriaEndereco)
            if (categoriaResult) {
              endereco.DescricaoCategoriaEndereco = categoriaResult.Nome;
            }
            var cidade = this.Cidades.find(cidade => cidade.IdCidade == endereco.IdCidade)
            if (cidade) {
              endereco.NomeCidade = cidade.Nome;
            }
          });
          this.emails = retorno.Emails.length > 0 ? retorno.Emails : [];
          this.emails.forEach(email => {
            var categoriaResult = this.categoriasEmail.find(categoria => email.IdCategoriaEmail == categoria.IdCategoriaEmail)
            if (categoriaResult) {
              email.DescricaoCategoriaEmail = categoriaResult.Nome;
            }
          });
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
        }
      }
      )
    ).subscribe();
  }

  public PesquisarCidade() {
    if (this.Endereco.NomeCidade == '') {
      this.modalSearchCidade.nativeElement.click();
    } else {
      let CidadeRetorno = this.Cidades.filter(Cidade => Cidade.Nome == this.Endereco.NomeCidade.toLowerCase());
      if (CidadeRetorno.length > 0) {
        this.Endereco.IdCidade = CidadeRetorno[0].IdCidade;
        this.Endereco.NomeCidade = CidadeRetorno[0].Nome;
      }
    }
  }

  public ListarTodasCidades() {
    this.PessoaService.buscarTodasCidades().subscribe(result => {
      this.Cidades = result;
    });
  }

  public ListarTodasPessoas() {
    this.PessoaService.buscarTodos().subscribe(result => {
      this.Pessoas = result;
    });
  }

  public selecionarCidade(Cidade: Cidade) {
    if (Cidade) {
      this.Endereco.IdCidade = Cidade.IdCidade;
      this.Endereco.NomeCidade = Cidade.Nome;
    }
  }

  public selecionarPessoa(Pessoa: Pessoa) {
    if (Pessoa) {
      this.Pessoa.IdPessoa = Pessoa.IdPessoa;
    }
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
      if (this.Pessoa.TipoPessoa == 'F' && !cpf.isValid(this.Pessoa.CpfCnpj)) {
        this.AlertService.show("Cpf Inválido", { classname: 'bg-danger text-light', delay: 3000 });
        this.Pessoa.CpfCnpj = '';
        return;
      }

      if (this.Pessoa.TipoPessoa == 'J' && !cnpj.isValid(this.Pessoa.CpfCnpj)) {
        this.AlertService.show("Cnpj Inválido", { classname: 'bg-danger text-light', delay: 3000 });
        this.Pessoa.CpfCnpj = '';
        return;
      }
      if (this.perfil == "2") {
        this.Pessoa.Vinculos.push("2")
      }

      this.Pessoa.DataNascimento = this.dataNascimento;
      this.Pessoa.Enderecos = this.enderecos;
      this.Pessoa.Telefones = this.telefones;
      this.Pessoa.Emails = this.emails;
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
    this.enderecos.push(this.Endereco)
    this.Endereco = new enderecoRetorno();
  }

  public selecionarEndereco(Endereco: enderecoRetorno) {
    if (Endereco) {
      this.Endereco = Endereco;
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
      if (CatEndereco.IdCategoriaEndereco == this.Endereco.IdCategoriaEndereco) {
        this.Endereco.DescricaoCategoriaEndereco = CatEndereco.Nome;
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
      if (CatTelefone.IdCategoriaTelefone == this.telefone.IdCategoriaTelefone) {
        this.telefone.DecricaoCategoriaTelefone = CatTelefone.Nome;
      }
    })
  }

  public limparTelefone() {
    this.telefone = new telefoneRetorno();
  }


  public async AdicionarEmail() {
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
      if (CatEmail.IdCategoriaEmail == this.email.IdCategoriaEmail) {
        this.email.DescricaoCategoriaEmail = CatEmail.Nome;
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

  async buscarPorCep() {
    if (this.Endereco.Cep.length == 8) {
      let retorno: any = await this.PessoaService.buscaPorCEP(this.Endereco.Cep);
      if (retorno.logradouro != '') {
        this.Endereco.Logradouro = retorno.logradouro;
      }
      if (retorno.logradouro != '') {
        this.Endereco.Bairro = retorno.bairro;
      }
      if (retorno.ibge) {
        let CidadeRetorno = this.Cidades.filter(Cidade => Cidade.CodigoIBGE === retorno.ibge);
        this.Endereco.IdCidade = CidadeRetorno[0].IdCidade;
        this.Endereco.NomeCidade = CidadeRetorno[0].Nome;
      }
    }

  }

  async Pesquisar() {
    if (this.Pessoa.IdPessoa == '') {
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.Pessoa.IdPessoa)
      if (retorno) {
        this.Pessoa = retorno;
        this.dataNascimento = new Date(this.Pessoa.DataNascimento + " 00:00:00")
        if (retorno.Inativo == 0) {
          this.Pessoa.Inativo = false;
        } else {
          this.Pessoa.Inativo = true;
        }
        this.telefones = retorno.Telefones.length > 0 ? retorno.Telefones : [];
        this.telefones.forEach(telefone => {
          var categoriaResult = this.categoriasTelefone.find(categoria => telefone.IdCategoriaTelefone == categoria.IdCategoriaTelefone)
          if (categoriaResult) {
            telefone.DecricaoCategoriaTelefone = categoriaResult.Nome;
          }
        });
        this.enderecos = retorno.Enderecos.length > 0 ? retorno.Enderecos : [];
        this.enderecos.forEach(endereco => {
          var categoriaResult = this.categoriasEndereco.find(categoria => categoria.IdCategoriaEndereco == endereco.IdCategoriaEndereco)
          if (categoriaResult) {
            endereco.DescricaoCategoriaEndereco = categoriaResult.Nome;
          }
          var cidade = this.Cidades.find(cidade => cidade.IdCidade == endereco.IdCidade)
          if (cidade) {
            endereco.NomeCidade = cidade.Nome;
          }
        });
        this.emails = retorno.Emails.length > 0 ? retorno.Emails : [];
        this.emails.forEach(email => {
          var categoriaResult = this.categoriasEmail.find(categoria => email.IdCategoriaEmail == categoria.IdCategoriaEmail)
          if (categoriaResult) {
            email.DescricaoCategoriaEmail = categoriaResult.Nome;
          }
        });
      }


    }
  }

  public ValidarUsuario() {
    this.perfil = this.accountService.getTipoUser();
    if (this.perfil == "1") {
      this.NomePagina = "Cadastro de Pessoa"
    } else {
      this.NomePagina = "Cadastro de Cliente"
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

  async PesquisarUsuarioPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisa == "NR") {
      pesquisa = { NomeRazao: this.InputFiltroPesquisa }
    } else if (this.FiltroPesquisa == "AF") {
      pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa }
    } else if (this.FiltroPesquisa == "C") {
      pesquisa = { CpfCnpj: this.InputFiltroPesquisa }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    this.Pessoas = retorno.resultado
  }

}

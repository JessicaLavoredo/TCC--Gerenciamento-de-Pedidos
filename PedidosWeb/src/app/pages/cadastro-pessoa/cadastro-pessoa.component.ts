import { Estado } from './../../class/estado';
import { emailRetorno } from './../../class/emailRetorno';
import { telefoneRetorno } from './../../class/telefoneRetorno';
import { enderecoRetorno } from './../../class/enderecoRetorno';
import { Vinculo } from './../../class/vinculo';
import { endereco } from './../../class/endereco';
import { Cidade } from './../../class/cidade';
import { PessoaService } from './../../services/pessoa.service';
import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaEndereco } from 'src/app/class/categoria-endereco';
import { CategoriaEmail } from 'src/app/class/categoria-email';
import { CategoriaTelefone } from 'src/app/class/categoria-telefone';
import { Pessoa } from 'src/app/class/Pessoa';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { triggerAsyncId } from 'async_hooks';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
  public paginaAtual = 1;
  public Cidades: Cidade[] = [];
  public cidade: Cidade = new Cidade();
  public filter;
  public categoriasEndereco: CategoriaEndereco[] = [];
  public categoriasEmail: CategoriaEmail[] = [];
  public categoriasTelefone: CategoriaTelefone[] = [];
  public Pessoa: Pessoa = new Pessoa();
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


  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;
  @ViewChild('modalSearchCidade') modalSearchCidade: ElementRef;

  constructor(private PessoaService: PessoaService, private router: Router) { }

  ngOnInit(): void {
    this.limparTela()
  }

  limparTela() {
    this.Pessoa = new Pessoa();
    this.enderecos = [];
    this.Endereco = new enderecoRetorno();
    this.telefone = new telefoneRetorno();
    this.telefones = [];
    this.email = new emailRetorno();
    this.emails = [];
    this.Vinculos = [];
    this.Pessoa.tipoPessoa = 'F';
    this.telefone.dDI = '55'
    this.alterartipo();
    this.desativado = false;
    this.listarCatEndereco();
    this.listarCatEmail();
    this.listarCatTelefone();
    this.listarVinculo();
    this.ListarTodasCidades();
    this.filtros = {};
  }

  public PesquisarCidade() {
    if (this.Endereco.nomeCidade == '') {
      this.modalSearchCidade.nativeElement.click();
    } else {
      let CidadeRetorno = this.Cidades.filter(Cidade => Cidade.nome == this.Endereco.nomeCidade.toLowerCase());
      if (CidadeRetorno.length > 0) {
        this.Endereco.idCidade = CidadeRetorno[0].idCidade;
        this.Endereco.nomeCidade = CidadeRetorno[0].nome;
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
      this.Endereco.idCidade = Cidade.idCidade;
      this.Endereco.nomeCidade = Cidade.nome;
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
      this.Pessoa.enderecos = this.enderecos;
      this.Pessoa.telefones = this.telefones;
      this.Pessoa.emails = this.emails;
      let retorno = await this.PessoaService.gravar(this.Pessoa);
      alert(retorno.data)
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
      if (CatEndereco.IdCategoriaEndereco == this.Endereco.idCategoriaEndereco) {
        this.Endereco.descricaoCategoriaEndereco = CatEndereco.Nome;
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
      if (CatTelefone.IdCategoriaTelefone == this.telefone.idCategoriaTelefone) {
        this.telefone.decricaoCategoriaTelefone = CatTelefone.Nome;
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
      if (CatEmail.IdCategoriaEmail == this.email.idCategoriaEmail) {
        this.email.descricaoCategoriaEmail = CatEmail.Nome;
      }
    })
  }

  public limparEmail() {
    this.email = new emailRetorno();
  }

  public alterartipo() {
    if (this.Pessoa.tipoPessoa == 'F') {
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
    if (this.Endereco.cep.length == 8) {
      let retorno: any = await this.PessoaService.buscaPorCEP(this.Endereco.cep);
      if (retorno.logradouro != '') {
        this.Endereco.logradouro = retorno.logradouro;
      }
      if (retorno.logradouro != '') {
        this.Endereco.bairro = retorno.bairro;
      }
      if (retorno.ibge) {
        let CidadeRetorno = this.Cidades.filter(Cidade => Cidade.codigoIBGE === retorno.ibge);
        this.Endereco.idCidade = CidadeRetorno[0].idCidade;
        this.Endereco.nomeCidade = CidadeRetorno[0].nome;
      }
    }

  }

  async Pesquisar() {
    if (this.Pessoa.idPessoa == '') {
      this.ListarTodasPessoas();
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.Pessoa.idPessoa)
      if (retorno) {
        this.Pessoa = retorno;
        if (retorno.inativo == 0) {
          this.Pessoa.inativo = false;
        } else {
          this.Pessoa.inativo = true;
        }
        this.telefones = retorno.telefones.length > 0 ? retorno.telefones : [];
        this.enderecos = retorno.enderecos.length > 0 ? retorno.enderecos : [];
        this.emails = retorno.emails.length > 0 ? retorno.emails : [];
      }
    }
  }

}

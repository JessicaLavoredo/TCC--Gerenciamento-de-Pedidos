import { EstadoFiltro } from './../../class/estadoFiltro';
import { Vinculo } from './../../class/vinculo';
import { CidadeFiltro } from './../../class/cidadeFiltro';
import { AccountService } from './../../services/account.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pessoa } from 'src/app/class/Pessoa';
import { PessoaService } from './../../services/pessoa.service';
import { AlertService } from './../../services/alert.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { PessoaFiltro } from 'src/app/class/PessoaFiltro';
import { enderecoFitro } from 'src/app/class/enderecoFiltro';
import { Cidade } from 'src/app/class/cidade';
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Estado } from 'src/app/class/estado';

export interface PessoaFiltro {
  IdPessoa?: string;
  TipoPessoa?: string;
  NomeRazao?: string;
  ApelidoFantasia?: string;
  CpfCnpj?: string;
  RgInscricao?: string;
  DataNascimento?: Date;
  Genero?: string;
  Inativo?: boolean;
  DataInclusao?: Date;
  Enderecos?: [{
    Cidade?: {
      IdCidade?: string;
      Nome?: string;
      CodigoIBGE?: string;
      Estado?: {
        IdEstado?: string;
        Nome?: string;
        Sigla?: string;
        Regiao?: string;
        CodigoIBGE?: string;
      }
    }
  }
  ];
  Vinculos?: number[];
}

@Component({
  selector: 'app-relatorio-pessoa',
  templateUrl: './relatorio-pessoa.component.html',
  styleUrls: ['./relatorio-pessoa.component.css']
})
export class RelatorioPessoaComponent implements OnInit {
  public PessoaFiltro: PessoaFiltro;
  PessoasFiltro: any[];
  NomePagina: string = "";
  perfil: string = '';
  DataNascimento: Date;
  public cpfMask = '000.000.000-00';
  public rgMask = '00.000.000-0';
  dataNascimento: Date;
  FiltroVinculos: any[];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  Vinculos: Vinculo[];
  public paginaAtual = 1;
  public Cidades: Cidade[] = [];
  public Estados: Estado[] = [];
  FiltroPesquisaCidade: string;
  InputFiltroPesquisaCidade: any;
  FiltrosCidade: { Codigo: string; Descricao: string; }[];
  FiltroPesquisaEstado: string;
  InputFiltroPesquisaEstado: any;
  FiltrosEstado: { Codigo: string; Descricao: string; }[];
  @ViewChild('modalSearchCidade') modalSearchCidade: ElementRef;
  @ViewChild('modalSearchEstado') modalSearchEstado: ElementRef;
  NomeRazao: any;
  TipoPessoa?: string;
  ApelidoFantasia?: string;
  CpfCnpj?: string;
  RgInscricao?: string;
  Genero?: string;
  Inativo?: boolean;
  DataInclusao?: Date;
  Cidade: CidadeFiltro;
  VinculosRetorno: number[];
  Estado: EstadoFiltro;
  queryCidade = new FormControl();
  queryEstado = new FormControl();
  paginaAtualCidade = 1;
  paginaAtualEstado = 1;


  constructor(private PessoaService: PessoaService, private AlertService: AlertService, private accountService: AccountService, private localeService: BsLocaleService) { }

  ngOnInit(): void {
    this.ValidarUsuario();
    this.limparTela();
    this.listarVinculo();
    this.dpConfig.isAnimated = true;
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.localeService.use('pt-br');
    this.PreecherComboCidade();
    this.PreecherComboEstado();
    this.DepoisBuscar();
  }
  public ValidarUsuario() {
    this.perfil = this.accountService.getTipoUser();
    if (this.perfil == "3") {
      this.NomePagina = "Relatório de Cliente"
    } else {
      this.NomePagina = "Relatório de Pessoa"
    }
  }

  limparTela() {
    this.PessoaFiltro = {};
    this.NomeRazao = null;
    this.TipoPessoa = null;
    this.ApelidoFantasia = null;
    this.CpfCnpj = null;
    this.RgInscricao = null;
    this.DataNascimento = null;
    this.Genero = null;
    this.Inativo = null;
    this.DataInclusao = null;
    this.Cidade = new CidadeFiltro();
    this.Estado = new EstadoFiltro();
    this.Cidade.IdCidade = '';
    this.PessoasFiltro = [];
  }

  public async Gerar() {
    this.Cidade.Estado = this.Estado;
    this.PessoaFiltro = {};
    this.PessoaFiltro.NomeRazao = this.NomeRazao == '' ? null : this.NomeRazao;
    this.PessoaFiltro.Genero = this.Genero == '' ? null : this.Genero;
    this.PessoaFiltro.Inativo = this.Inativo;
    this.PessoaFiltro.RgInscricao = this.RgInscricao == '' ? null : this.RgInscricao;
    this.PessoaFiltro.TipoPessoa = this.TipoPessoa == '' ? null : this.TipoPessoa;
    this.PessoaFiltro.ApelidoFantasia = this.ApelidoFantasia == '' ? null : this.ApelidoFantasia;
    this.PessoaFiltro.DataInclusao = this.DataInclusao;
    this.PessoaFiltro.DataNascimento = this.DataNascimento;

    this.PessoaFiltro.Enderecos = [{ Cidade: this.Cidade }]
    if (this.perfil == '3') {
      this.VinculosRetorno = []
      let Vinculo = 2;
      this.VinculosRetorno.push(Vinculo);
      this.PessoaFiltro.Vinculos = this.VinculosRetorno;
    } else {
      this.PessoaFiltro.Vinculos = this.VinculosRetorno ? this.VinculosRetorno : [];
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(this.PessoaFiltro);
    this.PessoasFiltro = retorno.resultado
    this.PessoasFiltro.forEach(Pessoa => {
      let mes = new Date(Pessoa.DataNascimento).getMonth() + 1
      let messtring = mes < 10 ? '0' + mes : mes
      let dia = new Date(Pessoa.DataNascimento).getUTCDate()
      let diastring = dia < 10 ? '0' + dia : dia
      Pessoa.DataNascimento = diastring + '/' + messtring + '/' + new Date(Pessoa.DataNascimento).getFullYear();
    })
  }

  public listarVinculo() {
    this.PessoaService.buscarTodosVinculos().subscribe(result => {
      this.Vinculos = result;
    });
  }

  async PesquisarCidade() {
    if (this.Cidade.IdCidade == '' || !this.Cidade.IdCidade) {
      this.modalSearchCidade.nativeElement.click();
    } else {
      let pesquisa: any;
      pesquisa = { idCidade: this.InputFiltroPesquisaCidade }
      let retorno: any = await this.PessoaService.BuscarCidadePorFiltro(pesquisa);
      let Cidades: Cidade[] = retorno.resultado;
      this.Cidade.IdCidade = Cidades[0].IdCidade;
      this.Cidade.Nome = Cidades[0].Nome
    }
  }

  async PesquisarEstado() {
    if (this.Estado.IdEstado == '' || !this.Estado.IdEstado) {
      this.modalSearchEstado.nativeElement.click();
    } else {
      let pesquisa: any;
      pesquisa = { IdEstado: this.InputFiltroPesquisaEstado }
      let retorno: any = await this.PessoaService.BuscarEstadoPorId(pesquisa);
      let Estados: Estado[] = retorno.resultado;
      this.Estado.IdEstado = Estados[0].IdEstado;
      this.Estado.Nome = Estados[0].Nome
    }
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

  public PreecherComboEstado() {
    this.FiltrosEstado = [
      {
        Codigo: "N",
        Descricao: "Nome"
      },
      {
        Codigo: "S",
        Descricao: "Sigla"
      },
      {
        Codigo: "R",
        Descricao: "Região"
      },
      {
        Codigo: "CI",
        Descricao: "Código IBGE"
      }

    ]
  }

  public selecionarCidade(Cidade: Cidade) {
    if (Cidade) {
      this.Cidade.IdCidade = Cidade.IdCidade;
      this.Cidade.Nome = Cidade.Nome;
    }
    this.DepoisBuscar()
  }

  public DepoisBuscar() {
    this.queryCidade.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarCidadePorId(this.Cidade.IdCidade)),
      map((retorno: any) => {
        if (retorno == "Codigo Indefinido") {
          this.Cidade.IdCidade = null;
          this.Cidade.Nome = null;
        } else if (retorno.status == 200) {
          this.Cidade.IdCidade = retorno.resultado.IdCidade;
          this.Cidade.Nome = retorno.resultado.Nome
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
          this.Cidade.IdCidade = null;
          this.Cidade.Nome = null;
        }
      }
      )
    ).subscribe();
    this.queryEstado.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarEstadoPorId(this.Estado.IdEstado)),
      map((retorno: any) => {
        if (retorno == "Codigo Indefinido") {
          this.Estado.IdEstado = null;
          this.Estado.Nome = null;
        } else if (retorno.status == 200) {
          this.Estado.IdEstado = retorno.resultado.IdEstado;
          this.Estado.Nome = retorno.resultado.Nome
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
        }
      }
      )
    ).subscribe();
  }

  public selecionarEstado(Estado: Estado) {
    if (Estado) {
      this.Estado.IdEstado = Estado.IdEstado;
      this.Estado.Nome = Estado.Nome;
    }
    this.DepoisBuscar()
  }

  async PesquisarEstadoPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisaEstado == "N") {
      pesquisa = { Nome: this.InputFiltroPesquisaEstado }
    } else if (this.FiltroPesquisaEstado == "S") {
      pesquisa = { Sigla: this.InputFiltroPesquisaEstado }
    } else if (this.FiltroPesquisaEstado == "R") {
      pesquisa = { Regiao: this.InputFiltroPesquisaEstado }
    } else if (this.FiltroPesquisaEstado == "CI") {
      pesquisa = { CodigoIBGE: this.InputFiltroPesquisaEstado }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarEstadoPorFiltro(pesquisa);
    let Estados: Estado[] = retorno.resultado;

    this.Estados = Estados;

  }


  handlePageChangeCidade(event) {
    this.paginaAtualCidade = event;
  }
  handlePageChangeEstado(event) {
    this.paginaAtualEstado = event;
  }
}


// import { PedidoFiltro } from './../../class/pedidoFiltro';
import { PedidoService } from './../../services/pedido.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/class/Pessoa';
import { PessoaService } from './../../services/pessoa.service';
import { AlertService } from './../../services/alert.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FormaPagamento } from 'src/app/class/forma-pagamento';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { EstadoFiltro } from './../../class/estadoFiltro';
import { CidadeFiltro } from './../../class/cidadeFiltro';
import { Cidade } from 'src/app/class/cidade';
import { Estado } from 'src/app/class/estado';
import { PessoaFiltro } from 'src/app/class/PessoaFiltro';
import { Pedido } from 'src/app/class/pedido';

export interface PedidoFiltro {
  IdPedido?: string;
  Pessoa?: {
    IdPessoa?: string;
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
  }
  Status?: {
    IdStatusPedido?: string;
  },
  FormaPagamento?: {
    IdFormaPagamento?: string;
  },
  DataCriacao?: string;
}

@Component({
  selector: 'app-relatorio-pedido',
  templateUrl: './relatorio-pedido.component.html',
  styleUrls: ['./relatorio-pedido.component.css']
})

export class RelatorioPedidoComponent implements OnInit {
  IdStatusPedido: string;
  DataPedido: Date;
  IdPessoa: string;
  IdUsuarioMovimentacao: string;
  IdFormaPagamento: string;
  public PedidoFiltro: PedidoFiltro;
  public Cliente: Pessoa = new Pessoa();
  public Vendedor: Pessoa = new Pessoa();
  public PessoaFiltro: PessoaFiltro;
  public Pessoas: Pessoa[] = [];
  FiltroPesquisa: string;
  FiltroPesquisaVendedor: string;
  InputFiltroPesquisa: string;
  InputFiltroPesquisaVendedor: string;
  Filtros: any[];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public FormasPagamento: FormaPagamento[] = [];
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;
  ComboStatus: any[];
  NomeCliente: any;
  NomeVendedor: any;
  queryCidade = new FormControl();
  queryEstado = new FormControl();
  queryPessoa = new FormControl();
  queryVendedor = new FormControl();
  Cidade: CidadeFiltro;
  Estado: EstadoFiltro;
  public paginaAtual = 1;
  public Cidades: Cidade[] = [];
  public Estados: Estado[] = [];
  FiltroPesquisaCidade: string;
  InputFiltroPesquisaCidade: any;
  FiltrosCidade: { Codigo: string; Descricao: string; }[];
  FiltroPesquisaEstado: string;
  InputFiltroPesquisaEstado: any;
  FiltrosEstado: { Codigo: string; Descricao: string; }[];
  @ViewChild('modalSearchVendedor') modalSearchVendedor: ElementRef;
  @ViewChild('modalSearchCidade') modalSearchCidade: ElementRef;
  @ViewChild('modalSearchEstado') modalSearchEstado: ElementRef;
  Pedidos: Pedido[];

  constructor(private pedidoService: PedidoService, private AlertService: AlertService, private PessoaService: PessoaService, private localeService: BsLocaleService) { }

  ngOnInit(): void {
    this.limparTela();
    this.listarFormaPagamento();
    this.listarStatus();
    this.DepoisBuscar();
    this.PreecherComboFiltro();
    this.PreecherComboCidade();
    this.PreecherComboEstado();
    this.dpConfig.isAnimated = true;
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.localeService.use('pt-br');
  }

  limparTela() {
    this.PedidoFiltro = {};
    this.IdStatusPedido = null;
    this.DataPedido = null;
    this.IdPessoa = null;
    this.IdUsuarioMovimentacao = null;
    this.IdFormaPagamento = null;
    this.Cidade = new CidadeFiltro();
    this.Estado = new EstadoFiltro();
    this.Cidade.IdCidade = '';
    this.NomeCliente = '';
    this.Pedidos = []
  }

  public async Gerar() {
    this.Cidade.Estado = this.Estado;
    this.PedidoFiltro = {};
    this.IdPessoa = this.IdPessoa == '' ? null : this.IdPessoa;
    this.IdStatusPedido = this.IdStatusPedido == '' ? null : this.IdStatusPedido;
    this.IdFormaPagamento = this.IdFormaPagamento == '' ? null : this.IdFormaPagamento;
    this.PedidoFiltro.Pessoa = { IdPessoa: this.IdPessoa, Enderecos: [{ Cidade: this.Cidade }] };
    this.PedidoFiltro.Status = { IdStatusPedido: this.IdStatusPedido };
    if (this.DataPedido) {
      let dia = this.DataPedido.getDate();
      let Mes = this.DataPedido.getMonth() + 1;
      let Ano = this.DataPedido.getFullYear();
      let messtring = Mes < 10 ? '0' + Mes : Mes
      let diastring = dia < 10 ? '0' + dia : dia
      this.PedidoFiltro.DataCriacao = Ano + "-" + messtring + "-" + diastring;
    }
    this.PedidoFiltro.FormaPagamento = { IdFormaPagamento: this.IdFormaPagamento };
    let retorno: any = await this.pedidoService.BuscarPorFiltro(this.PedidoFiltro);
    this.Pedidos = retorno.resultado
  }

  async PesquisarUsuarioPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisa == "NR") {
      pesquisa = { NomeRazao: this.InputFiltroPesquisa, Vinculos: [2] }
    } else if (this.FiltroPesquisa == "AF") {
      pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa, Vinculos: [2] }
    } else if (this.FiltroPesquisa == "C") {
      pesquisa = { CpfCnpj: this.InputFiltroPesquisa, Vinculos: [2] }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    this.Pessoas = retorno.resultado
  }

  async PesquisarVendedorPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisaVendedor == "NR") {
      pesquisa = { NomeRazao: this.InputFiltroPesquisaVendedor, Vinculos: [1] }
    } else if (this.InputFiltroPesquisaVendedor == "AF") {
      pesquisa = { ApelidoFantasia: this.InputFiltroPesquisaVendedor, Vinculos: [1] }
    } else if (this.InputFiltroPesquisaVendedor == "C") {
      pesquisa = { CpfCnpj: this.InputFiltroPesquisaVendedor, Vinculos: [1] }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    this.Pessoas = retorno.resultado
  }

  public listarFormaPagamento() {
    this.pedidoService.buscarTodasFormasPagamento().subscribe(result => {
      this.FormasPagamento = result;
    });
  }

  public listarStatus() {
    this.pedidoService.buscarTodosStatus().subscribe(result => {
      this.ComboStatus = result;
    });
  }


  async PesquisarCliente() {
    if (this.IdPessoa == '' || !this.IdPessoa) {
      this.FiltroPesquisa = "NR";
      this.Pessoas = [];
      this.InputFiltroPesquisa = '';
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.IdPessoa)
      if (retorno) {
        this.NomeCliente = retorno.NomeRazao;
      }
    }
    this.DepoisBuscar()
  }

  async pesquisarVendedor() {
    if (this.IdUsuarioMovimentacao == '' || !this.IdUsuarioMovimentacao) {
      this.Pessoas = [];
      this.InputFiltroPesquisa = '';
      this.FiltroPesquisa = "NR";
      this.modalSearchVendedor.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.IdUsuarioMovimentacao)
      if (retorno) {
        this.NomeVendedor = retorno.NomeRazao;
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

  public DepoisBuscar() {
    this.queryPessoa.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.IdPessoa)),
      map((retorno: any) => {
        if (retorno == "Codigo Indefinido") {
          this.NomeCliente = null;
          this.IdPessoa = null;
          this.Cliente = new Pessoa();
        } else if (retorno.status == 200) {
          this.Cliente = retorno.resultado
          if (this.Cliente.Vinculos.filter(vinculo => vinculo == 2).length > 0) {
            this.NomeCliente = retorno.resultado.NomeRazao;
          } else {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.NomeCliente = null;
            this.IdPessoa = null;
          }
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
          this.NomeCliente = null;
          this.IdPessoa = null;
        }
      }
      )
    ).subscribe();
    this.queryVendedor.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.IdUsuarioMovimentacao)),
      map((retorno: any) => {
        if (retorno == "Codigo Indefinido") {
          this.NomeVendedor = null;
          this.IdUsuarioMovimentacao = null;
          this.Vendedor = new Pessoa();
        } else if (retorno.status == 200) {
          this.Vendedor = retorno.resultado
          if (this.Vendedor.Vinculos.filter(vinculo => vinculo == 1).length > 0) {
            this.NomeVendedor = retorno.resultado.NomeRazao;
          } else {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.NomeVendedor = null;
            this.IdUsuarioMovimentacao = null;
            this.Vendedor = new Pessoa();
          }
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
          this.NomeVendedor = null;
          this.IdUsuarioMovimentacao = null;
          this.Vendedor = new Pessoa();
        }
      }
      )
    ).subscribe();

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
          this.Estado.IdEstado = null;
          this.Estado.Nome = null;
        }
      }
      )
    ).subscribe();
  }

  public selecionarCidade(Cidade: Cidade) {
    if (Cidade) {
      this.Cidade.IdCidade = Cidade.IdCidade;
      this.Cidade.Nome = Cidade.Nome;
    }
    this.DepoisBuscar()
  }


  public selecionarPessoa(Pessoa: Pessoa) {
    if (Pessoa) {
      this.IdPessoa = Pessoa.IdPessoa;
      this.NomeCliente = Pessoa.NomeRazao;
    }
  }

  public selecionarVendedor(Pessoa: Pessoa) {
    if (Pessoa) {
      this.IdUsuarioMovimentacao = Pessoa.IdPessoa;
      this.NomeVendedor = Pessoa.NomeRazao;
    }
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

  handlePageChange(event) {
    this.paginaAtual = event;
  }

  public selecionarEstado(Estado: Estado) {
    if (Estado) {
      this.Estado.IdEstado = Estado.IdEstado;
      this.Estado.Nome = Estado.Nome;
    }
    this.DepoisBuscar()
  }

}

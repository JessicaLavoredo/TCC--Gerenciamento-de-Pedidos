import { PedidoService } from './../../services/pedido.service';
import { PedidoFiltro } from './../../class/pedidoFiltro';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/class/Pessoa';
import { PessoaService } from './../../services/pessoa.service';
import { AlertService } from './../../services/alert.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FormaPagamento } from 'src/app/class/forma-pagamento';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-relatorio-pedido',
  templateUrl: './relatorio-pedido.component.html',
  styleUrls: ['./relatorio-pedido.component.css']
})
export class RelatorioPedidoComponent implements OnInit {
  queryPessoa = new FormControl();
  queryVendedor = new FormControl();
  PedidoFiltro = new PedidoFiltro();
  public Pessoa: Pessoa = new Pessoa();
  public PessoaFiltro: Pessoa = new Pessoa();
  public Pessoas: Pessoa[] = [];
  FiltroPesquisa: string;
  InputFiltroPesquisa: string;
  Filtros: any[];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public FormasPagamento: FormaPagamento[] = [];
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;
  ComboStatus: any[];
  NomeCliente: any;
  NomeVendedor: any;

  constructor(private pedidoService: PedidoService, private AlertService: AlertService, private PessoaService: PessoaService) { }

  ngOnInit(): void {
    this.listarFormaPagamento();
    this.listarStatus();
    this.DepoisBuscar();
  }

  limparTela() {

  }

  public async Gerar() {
    // console.log(this.PedidoFiltro)
    // let retorno: any = await this.pedidoService.BuscarPorFiltro(this.PedidoFiltro);
    // this.PedidoFiltro = retorno.resultado
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
    if (this.PedidoFiltro.IdPessoa == '') {
      this.PreecherComboFiltro();
      this.FiltroPesquisa = "NR";
      this.Pessoas = [];
      this.InputFiltroPesquisa = '';
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.PedidoFiltro.IdPessoa)
      if (retorno) {
        this.NomeCliente = retorno.NomeRazao;
      }
    }
    this.DepoisBuscar()
  }

  async pesquisarVendedor() {
    if (this.PedidoFiltro.IdUsuarioMovimentacao == '') {
      this.Pessoas = [];
      this.InputFiltroPesquisa = '';
      this.FiltroPesquisa = "NR";
      this.modalSearchPessoa.nativeElement.click();
    } else {
      let retorno: any = await this.PessoaService.BuscarPorId(this.PedidoFiltro.IdUsuarioMovimentacao)
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
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.PedidoFiltro.IdPessoa)),
      map((retorno: any) => {
        if (retorno) {
          this.NomeCliente = retorno.NomeRazao;
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
        }
      }
      )
    ).subscribe();
    this.queryVendedor.valueChanges.pipe(
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.PessoaService.BuscarPorId(this.Pessoa.IdPessoa)),
      map((retorno: any) => {
        if (retorno) {
          this.Pessoa = retorno;
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
        }
      }
      )
    ).subscribe();
  }



  public selecionarPessoa(Pessoa: Pessoa) {
    if (Pessoa) {
      this.PedidoFiltro.IdPessoa = Pessoa.IdPessoa;
      this.NomeCliente = Pessoa.NomeRazao;
    }
  }

  public selecionarVendedor(Pessoa: Pessoa) {
    if (Pessoa) {
      this.PedidoFiltro.IdPessoa = Pessoa.IdPessoa;
    }
  }

}

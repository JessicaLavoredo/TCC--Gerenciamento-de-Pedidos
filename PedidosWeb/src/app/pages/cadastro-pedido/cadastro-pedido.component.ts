import { endereco } from './../../class/endereco';
import { FormaPagamento } from './../../class/forma-pagamento';
import { Pedido } from 'src/app/class/pedido';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Produto_Pedido } from 'src/app/class/Produto_Pedido';
import { Produto } from 'src/app/class/produto';
import { PedidoService } from './../../services/pedido.service';
import { MatAccordion } from '@angular/material/expansion';
import { Pessoa } from 'src/app/class/Pessoa';
import { AlertService } from './../../services/alert.service';
import { PessoaService } from './../../services/pessoa.service';
import { Console } from 'console';
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { ProdutoService } from './../../services/produto.service';
import { Produto_PedidoRetorno } from 'src/app/class/produto_pedidoRetorno';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {
  public paginaAtual = 1;
  public filter;
  public Pedido: Pedido = new Pedido();
  public ClienteEscolhido: boolean;
  public Cliente: Pessoa = new Pessoa();
  public Clientes: Pessoa[] = [];
  public Produto_Pedido: Produto_Pedido = new Produto_Pedido();
  public Produtos_Pedido: Produto_Pedido[] = [];
  public Produto: Produto = new Produto();
  public Produto_PedidoRetorno: Produto_PedidoRetorno = new Produto_PedidoRetorno();
  public Produtos_PedidoRetorno: Produto_PedidoRetorno[] = [];
  public FiltrosClientes = [];
  FiltroCliente = '';
  InputFiltroPesquisa: string;
  preco: String;
  queryProduto = new FormControl();
  queryProdutoCodInterno = new FormControl();
  queryValor = new FormControl();
  @ViewChild('myInput') myInput: ElementRef;

  public FormasPagamento: FormaPagamento[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;
  constructor(private pedidoService: PedidoService, private router: Router, private AlertService: AlertService, private PessoaService: PessoaService, private ProdutoService: ProdutoService,) { }

  ngOnInit(): void {
    this.listarFormaPagamento()
    this.ClienteEscolhido = false;
    this.PreecherComboFiltro();
    this.limpar()
    this.DepoisBuscar()
  }

  public DepoisBuscar() {
    this.queryProduto.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.ProdutoService.BuscarPorId(this.Produto_PedidoRetorno.IdProduto)),
      map((result: any) => {
        if (result) {
          this.Produto = result;
          this.Produto_PedidoRetorno.Descricao = this.Produto.NomeComercial
          this.Produto_PedidoRetorno.IdProduto = this.Produto.IdProduto
          this.Produto_PedidoRetorno.CodInternoProduto = this.Produto.CodigoInterno
          this.Produto_PedidoRetorno.Quantidade = null;
          if (this.Pedido.idFormaPagamento == "1") {
            this.Produto_PedidoRetorno.Preco = this.Produto.Vista
          } else if (this.Pedido.idFormaPagamento == "2") {
            this.Produto_PedidoRetorno.Preco = this.Produto.Prazo
          } else {
            this.AlertService.show("Selecione forma de pagamento", { classname: 'bg-warning text-light', delay: 3000 });
            this.Produto_PedidoRetorno = new Produto_PedidoRetorno
            this.DepoisBuscar()
          }

        }
      }
      )
    ).subscribe();

    // this.queryValor.valueChanges.pipe(
    //   map(value => value.trim()),
    //   filter(value => value.length > 0),
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   switchMap(value => this.Produto_PedidoRetorno.Preco = parseFloat(this.Produto_PedidoRetorno.Preco).toFixed(2)),
    //   map((result: any) => {
    //     if (result) {
    //       console.log(result)
    //       this.Produto = result;

    //       this.Produto_PedidoRetorno.Descricao = this.Produto.NomeComercial
    //       this.Produto_PedidoRetorno.IdProduto = this.Produto.IdProduto
    //       this.Produto_PedidoRetorno.CodInternoProduto = this.Produto.CodigoInterno
    //       if (this.Pedido.idFormaPagamento == "1") {
    //         this.Produto_PedidoRetorno.Preco = this.Produto.Vista
    //       } else if (this.Pedido.idFormaPagamento == "2") {
    //         this.Produto_PedidoRetorno.Preco = this.Produto.Prazo
    //       } else {
    //         // alert
    //       }

    //     }
    //   }
    //   )
    // ).subscribe();
  }

  setTwoNumberDecimal() {
    console.log(this.myInput.nativeElement.value);
    this.Produto_PedidoRetorno.Preco = parseFloat(this.myInput.nativeElement.value).toFixed(2);
    console.log(this.Produto_PedidoRetorno.Preco)
  }

  public async Gravar() {
    try {
      this.Pedido.Produto_Pedido = this.Produtos_Pedido
      let retorno = await this.pedidoService.gravar(this.Pedido);
    } catch (error) {
      console.error(error);
    }
  }


  public listarFormaPagamento() {
    this.pedidoService.buscarTodasFormasPagamento().subscribe(result => {
      this.FormasPagamento = result;
    });
  }

  public async AdicionarProduto() {
    // this.Produto_PedidoRetorno.Total = this.Produto_PedidoRetorno.Quantidade * this.Produto_PedidoRetorno.Preco
    this.Produtos_PedidoRetorno.push(this.Produto_PedidoRetorno)
    this.Produto_PedidoRetorno = new Produto_PedidoRetorno();
  }

  public limparProduto() {
    this.Produto_Pedido = new Produto_Pedido();

  }
  public limpar() {

  }

  public excluirProdutoPedido(Produto_Pedido: Produto_Pedido) {
    if (Produto_Pedido) {
      this.Produtos_Pedido.splice(this.Produtos_Pedido.indexOf(Produto_Pedido), 1)
    }
  }

  public selecionarProdutoPedido(Produto_Pedido: Produto_Pedido) {
    if (Produto_Pedido) {
      this.Produto_Pedido = Produto_Pedido;
    }
  }

  public PreecherComboFiltro() {
    this.FiltrosClientes = [
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

  async PesquisarClientePorFiltro() {
    let pesquisa: any;
    if (this.FiltroCliente == "NR") {
      pesquisa = { NomeRazao: this.InputFiltroPesquisa }
    } else if (this.FiltroCliente == "AF") {
      pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa }
    } else if (this.FiltroCliente == "C") {
      pesquisa = { CpfCnpj: this.InputFiltroPesquisa }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    this.Clientes = retorno.resultado
  }

  public async selecionarCliente(Cliente: Pessoa) {
    if (Cliente) {
      this.Cliente = Cliente;
      this.ClienteEscolhido = true;
    }

  }



}

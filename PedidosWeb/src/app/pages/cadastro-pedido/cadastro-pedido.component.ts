import { promise } from 'protractor';
import { email } from './../../class/email';
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
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { ProdutoService } from './../../services/produto.service';
import { Produto_PedidoRetorno } from 'src/app/class/produto_pedidoRetorno';
import { Console } from 'console';
import { AccountService } from './../../services/account.service';

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
  Endereco = '';
  CodigoProduto = '';
  FiltroCliente = '';
  TotalProdutos = '';
  TotalProdutosGrade = 0;
  nenhumProduto = true;
  InputFiltroPesquisa: string;
  preco: String;
  queryProduto = new FormControl();
  queryPedido = new FormControl();
  queryProdutoCodInterno = new FormControl();
  queryValor = new FormControl();
  DataPedido = '';
  @ViewChild('myInput') myInput: ElementRef;

  public FormasPagamento: FormaPagamento[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;
  Telefone: string;
  Email: any;
  constructor(private pedidoService: PedidoService, private accountService: AccountService, private router: Router, private AlertService: AlertService, private PessoaService: PessoaService, private ProdutoService: ProdutoService,) { }

  ngOnInit(): void {
    this.listarFormaPagamento()
    this.ClienteEscolhido = false;
    this.PreecherComboFiltro();
    this.limpar();
  }

  public DepoisBuscar() {
    this.queryProduto.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => this.ProdutoService.BuscarPorId(this.CodigoProduto)),
      map((result: any) => {
        if (this.Pedido.IdFormaPagamento == "") {
          if (this.CodigoProduto != '') {
            this.AlertService.show("Selecione forma de pagamento", { classname: 'bg-danger text-light', delay: 3000 });
          }
          this.Produto_PedidoRetorno = new Produto_PedidoRetorno
          this.CodigoProduto = ''
          this.DepoisBuscar()
          return;
        }
        if (result) {
          this.Produto = result;
          this.Produto_PedidoRetorno.Descricao = this.Produto.NomeComercial
          this.Produto_PedidoRetorno.IdProduto = this.Produto.IdProduto
          this.Produto_PedidoRetorno.CodInternoProduto = this.Produto.CodigoInterno
          this.Produto_PedidoRetorno.Quantidade = null;
          if (this.Pedido.IdFormaPagamento == "1") {
            this.Produto_PedidoRetorno.Preco = this.Produto.Vista
          } else if (this.Pedido.IdFormaPagamento == "2") {
            this.Produto_PedidoRetorno.Preco = this.Produto.Prazo
          }

        } else {
          if (this.CodigoProduto != '') {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.CodigoProduto = ''
          }
          return;
        }
      }
      )
    ).subscribe();
    this.queryPedido.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => this.pedidoService.BuscarPorId(this.Pedido.IdPedido)),
      map((result: any) => {
        console.log(result)
        if (result) {
          this.Pedido = result;
          this.Cliente.IdPessoa = this.Pedido.IdPessoa
          this.selecionarCliente(this.Cliente);
          let mes = new Date(this.Pedido.DataPedido).getMonth() + 1
          let messtring = mes < 10 ? '0' + mes : mes
          this.DataPedido = new Date(this.Pedido.DataPedido).getDate() + '/' + messtring + '/' + new Date(this.Pedido.DataPedido).getFullYear()
        } else {
          if (this.Pedido.IdPedido != '') {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.Pedido = new Pedido();
          }
          return;
        }
      }
      )
    ).subscribe();
  }

  public limpar() {
    this.CodigoProduto = '';
    this.Pedido = new Pedido;
    let mes = this.Pedido.DataPedido.getMonth() + 1
    let messtring = mes < 10 ? '0' + mes : mes
    this.DataPedido = this.Pedido.DataPedido.getDate() + '/' + messtring + '/' + this.Pedido.DataPedido.getFullYear()
    this.Cliente = new Pessoa;
    this.ClienteEscolhido = false;
    this.DepoisBuscar();
  }

  setTwoNumberDecimal() {
    console.log(this.myInput.nativeElement.value);
    this.Produto_PedidoRetorno.Preco = parseFloat(this.myInput.nativeElement.value).toFixed(2);
    console.log(this.Produto_PedidoRetorno.Preco)
  }

  public async Gravar() {
    try {
      this.Pedido.IdPessoa = this.Cliente.IdPessoa;
      const usuario = this.accountService.getUsuario();
      this.Pedido.IdUsuarioMovimentacao = usuario;
      for (var x = 0; x < this.Produtos_PedidoRetorno.length; x++) {
        this.Pedido.Produto_Pedido[x].IdProduto = this.Produtos_PedidoRetorno[x].IdProduto;
        this.Pedido.Produto_Pedido[x].Preco = this.Produtos_PedidoRetorno[x].Preco
        this.Pedido.Produto_Pedido[x].Quantidade = this.Produtos_PedidoRetorno[x].Quantidade.toString();
      }

      this.Pedido.Produto_Pedido = this.Produtos_Pedido
      let retorno: any = await this.pedidoService.gravar(this.Pedido);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
        this.limpar();
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
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
    this.Produto_PedidoRetorno.Preco = parseFloat(this.Produto_PedidoRetorno.Preco).toFixed(2).replace(".", ",");
    let preco = this.Produto_PedidoRetorno.Preco.toString().replace(",", ".")
    let total = this.Produto_PedidoRetorno.Quantidade * parseFloat(preco);
    this.TotalProdutosGrade = this.TotalProdutosGrade + total;
    this.Produto_PedidoRetorno.Total = total.toFixed(2).replace(".", ",");
    this.Produtos_PedidoRetorno.push(this.Produto_PedidoRetorno)
    this.Produto_PedidoRetorno = new Produto_PedidoRetorno();
    this.CodigoProduto = '';
    this.TotalProdutos = this.TotalProdutosGrade.toFixed(2).replace(".", ",");
    if (this.Produtos_PedidoRetorno.length > 0) {
      this.nenhumProduto = false;
    } else {
      this.nenhumProduto = true;
    }
    this.DepoisBuscar()
  }

  public limparProduto() {
    this.Produto_Pedido = new Produto_Pedido();

  }

  public excluirProdutoPedido(Produto_Pedido: Produto_PedidoRetorno) {
    if (Produto_Pedido) {
      this.Produto_Pedido.IdProduto = Produto_Pedido.IdProduto;
      this.Produto_Pedido.Preco = Produto_Pedido.Preco;
      this.Produto_Pedido.Quantidade = Produto_Pedido.Quantidade.toString();

      this.Produtos_PedidoRetorno.splice(this.Produtos_PedidoRetorno.indexOf(Produto_Pedido), 1)
      this.Pedido.Produto_Pedido.splice(this.Pedido.Produto_Pedido.indexOf(this.Produto_Pedido), 1)
    }
    if (this.Produtos_PedidoRetorno.length > 0) {
      this.nenhumProduto = false;
    } else {
      this.nenhumProduto = true;
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
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    this.Clientes = retorno.resultado
  }

  public async selecionarCliente(Cliente: Pessoa) {
    if (Cliente) {
      let retorno: any = await this.PessoaService.BuscarPorId(Cliente.IdPessoa)
      if (retorno) {
        this.Endereco = retorno.Enderecos[0].Logradouro + ', ' + retorno.Enderecos[0].Numero + ', ' + retorno.Enderecos[0].Bairro;
        this.Telefone = ' (' + retorno.Telefones[0].DDD + ') ' + retorno.Telefones[0].Numero
        this.Email = retorno.Emails[0].Endereco;
        this.Cliente = retorno;
      }
      this.ClienteEscolhido = true;
    }

  }



}

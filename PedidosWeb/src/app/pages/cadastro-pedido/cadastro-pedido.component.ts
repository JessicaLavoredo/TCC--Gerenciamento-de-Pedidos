import { FormaPagamento } from 'src/app/class/forma-pagamento';
import { Pedido_Produto } from './../../class/pedido_produto';
import { Estado } from './../../class/estado';
import { Cidade } from './../../class/cidade';
import { promise } from 'protractor';
import { email } from './../../class/email';
import { endereco } from './../../class/endereco';
import { Pedido } from 'src/app/class/pedido';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {
  public paginaAtual = 1;
  paginaAtualProdutoModal = 1;
  public filter;
  public Pedido: Pedido = new Pedido();
  public ClienteEscolhido: boolean;
  public Cliente: Pessoa = new Pessoa();
  public Clientes: Pessoa[] = [];
  public Pedido_Produto: Pedido_Produto = new Pedido_Produto();
  public Pedido_Produtos: Pedido_Produto[] = [];
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
  tipoBtn = "btn-danger"
  ComboStatus: any[];
  classeStatus: string;
  @ViewChild('modalSearch') modalSearch: ElementRef;
  public FormasPagamento: FormaPagamento[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;
  Telefone: string;
  Email: any;
  Status: any[];
  perfil: string = '';
  Idpessoa: string = '';
  public Produtos: Produto[] = [];
  queryProdutoCodigoInterno = new FormControl();
  FiltroPesquisa: string;
  Filtros: any[];
  FiltrosProdutos: { Codigo: string; Descricao: string; }[];
  FiltroPesquisaProduto: string;
  InputFiltroPesquisaProduto: any;
  idStatusAntigo: String;
  paginaAtualPessoa = 1;
  DisableSalvar: boolean;
  constructor(private pedidoService: PedidoService, private route: ActivatedRoute, private accountService: AccountService, private router: Router, private AlertService: AlertService, private PessoaService: PessoaService, private ProdutoService: ProdutoService,) { }

  ngOnInit(): void {
    this.DisableSalvar = false;
    this.ValidarUsuario();
    this.listarFormaPagamento()
    this.ClienteEscolhido = false;
    this.PreecherComboFiltro();
    this.PreecherComboFiltroProduto();
    this.listarStatus();
    this.limpar();
    this.route.queryParams
      .subscribe(params => {
        if (params) {
          this.Pedido.IdPedido = params.id ? params.id : '';
        }
      }
      );


  }

  public DepoisBuscar() {
    this.queryProduto.valueChanges.pipe(
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
        if (result.status == 200) {
          this.Produto = result.resultado;
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
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => this.pedidoService.BuscarPorId(this.Pedido.IdPedido)),
      map((result: any) => {
        if (result == "Codigo Indefinido") {
          this.limpar();
        } else if (result.status == 200) {
          this.Pedido = result.resultado;
          this.Pedido.IdStatus = result.resultado.Status.IdStatusPedido;
          this.Cliente.IdPessoa = result.resultado.Pessoa.IdPessoa
          this.selecionarCliente(this.Cliente);
          let mes = new Date(result.resultado.DataCricao).getMonth() + 1
          let messtring = mes < 10 ? '0' + mes : mes
          let dia = new Date(result.resultado.DataCricao).getDate()
          let diastring = dia < 10 ? '0' + dia : dia
          this.DataPedido = diastring + '/' + messtring + '/' + new Date(result.resultado.DataCricao).getFullYear();
          this.Produtos_PedidoRetorno = [];
          this.TotalProdutos = '';
          this.TotalProdutosGrade = 0;
          result.resultado.Produtos.forEach(ProdutoPedido => {
            let ProdutoPedidoRetorno: Produto_PedidoRetorno = new Produto_PedidoRetorno();
            ProdutoPedidoRetorno.Preco = parseFloat(ProdutoPedido.Preco).toFixed(2).replace(".", ",");
            let preco = ProdutoPedido.Preco.toString().replace(",", ".")
            let total = parseFloat(ProdutoPedido.Quantidade) * parseFloat(preco);
            this.TotalProdutosGrade = this.TotalProdutosGrade + total;
            ProdutoPedidoRetorno.PrecoFinal = total.toFixed(2).replace(".", ",");
            ProdutoPedidoRetorno.Descricao = ProdutoPedido.Produto.NomeComercial;
            ProdutoPedidoRetorno.IdProduto = ProdutoPedido.Produto.IdProduto;
            ProdutoPedidoRetorno.Quantidade = ProdutoPedido.Quantidade;
            this.Produtos_PedidoRetorno.push(ProdutoPedidoRetorno);
          });
          this.TotalProdutos = this.TotalProdutosGrade.toFixed(2).replace(".", ",");
          this.Pedido.IdFormaPagamento = result.resultado.FormaPagamento.IdFormaPagamento;

          if (this.Produtos_PedidoRetorno.length > 0) {
            this.nenhumProduto = false;
          } else {
            this.nenhumProduto = true;
          }
          this.alterarSituacao();
          if (this.perfil == '3') {
            if (this.Pedido.IdStatus == "2" || this.Pedido.IdStatus == "4") {
              this.DisableSalvar = true;
            } else {
              this.DisableSalvar = false;
            }
          } else {
            this.DisableSalvar = false;
          }
        } else {
          if (this.Pedido.IdPedido != '') {
            this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
            this.Pedido = new Pedido();
            this.CodigoProduto = '';
            this.Pedido = new Pedido;
            let mes = this.Pedido.DataPedido.getMonth() + 1
            let messtring = mes < 10 ? '0' + mes : mes
            let dia = new Date(this.Pedido.DataPedido).getDate()
            let diastring = dia < 10 ? '0' + dia : dia
            this.DataPedido = diastring + '/' + messtring + '/' + this.Pedido.DataPedido.getFullYear()
            this.Cliente = new Pessoa;
            this.ClienteEscolhido = false;
            this.alterarSituacao();
            this.Produtos_PedidoRetorno = [];
            this.TotalProdutos = '';
            this.TotalProdutosGrade = 0;
            this.nenhumProduto = true;

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
    let dia = new Date(this.Pedido.DataPedido).getDate()
    let diastring = dia < 10 ? '0' + dia : dia
    this.DataPedido = diastring + '/' + messtring + '/' + this.Pedido.DataPedido.getFullYear()
    this.Cliente = new Pessoa;
    this.ClienteEscolhido = false;
    this.alterarSituacao();
    this.Produtos_PedidoRetorno = [];
    this.TotalProdutos = '';
    this.TotalProdutosGrade = 0;
    this.nenhumProduto = true;
    this.Produto_PedidoRetorno.Descricao = '';
    this.Produto_PedidoRetorno.Preco = '';
    this.Produto_PedidoRetorno.Quantidade = '';

    this.DepoisBuscar();
  }

  setTwoNumberDecimal() {
    this.Produto_PedidoRetorno.Preco = parseFloat(this.myInput.nativeElement.value).toFixed(2);
  }

  public async Gravar() {
    try {

      if (this.perfil == "3") {
        if (this.Pedido.IdStatus == "2") {
          this.AlertService.show("Usuario não autorizado Alterar o status do pedido para Separação", { classname: 'bg-danger text-light', delay: 3000 });
          return
        } else if (this.Pedido.IdStatus == "4") {
          this.AlertService.show("Usuario não autorizado Alterar o status do pedido para Entregue", { classname: 'bg-danger text-light', delay: 3000 });
          return
        }
      }

      if (this.Cliente.IdPessoa == '' || !this.Cliente.IdPessoa) {
        this.AlertService.show("Informe o Cliente", { classname: 'bg-danger text-light', delay: 3000 });
        return
      }
      if (this.Pedido.IdFormaPagamento == '' || !this.Pedido.IdFormaPagamento) {
        this.AlertService.show("Informe a Forma de Pagamento", { classname: 'bg-danger text-light', delay: 3000 });
        return
      }

      if (this.Produtos_PedidoRetorno.length <= 0) {
        this.AlertService.show("Adicione os Produtos", { classname: 'bg-danger text-light', delay: 3000 });
        return
      }

      this.Pedido.IdPessoa = this.Cliente.IdPessoa;
      const usuario = this.accountService.getUsuario();
      this.Pedido.IdUsuarioMovimentacao = usuario;
      let Data = this.DataPedido.split("/")
      let dia = parseInt(Data[0]);
      let mes = parseInt(Data[1]);
      let ano = parseInt(Data[2]);

      this.Pedido.DataPedido = new Date(ano, mes, dia, 0, 0)
      for (var x = 0; x < this.Produtos_PedidoRetorno.length; x++) {
        let ProdutoPedido: Pedido_Produto = new Pedido_Produto();
        ProdutoPedido.IdProduto = this.Produtos_PedidoRetorno[x].IdProduto;
        ProdutoPedido.Preco = this.Produtos_PedidoRetorno[x].Preco.replace(",", ".")
        ProdutoPedido.Quantidade = this.Produtos_PedidoRetorno[x].Quantidade.toString();
        ProdutoPedido.Desconto = "0";

        this.Pedido.Produtos.push(ProdutoPedido);
      }
      this.Pedido.IdPedido = this.Pedido.IdPedido == "" ? null : this.Pedido.IdPedido;
      let idPedido;
      idPedido = this.Pedido.IdPedido

      let retorno: any = await this.pedidoService.gravar(this.Pedido);

      if (retorno.status == 200) {
        if (idPedido == '' || idPedido == null) {
          this.pedidoService.buscarTodos().subscribe(result => {
            this.AlertService.show('Registro ' + result.pop().IdPedido + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
          });
        } else {
          this.AlertService.show('Registro ' + idPedido + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
        }

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

  public listarStatus() {
    this.pedidoService.buscarTodosStatus().subscribe(result => {
      this.ComboStatus = result;
    });
  }

  public async AdicionarProduto() {
    this.Produto_PedidoRetorno.Preco = parseFloat(this.Produto_PedidoRetorno.Preco).toFixed(2).replace(".", ",");
    let preco = this.Produto_PedidoRetorno.Preco.toString().replace(",", ".")
    let total = parseFloat(this.Produto_PedidoRetorno.Quantidade) * parseFloat(preco);
    this.TotalProdutosGrade = this.TotalProdutosGrade + total;
    this.Produto_PedidoRetorno.PrecoFinal = total.toFixed(2).replace(".", ",");
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
    this.Pedido_Produto = new Pedido_Produto();

  }

  public excluirProdutoPedido(Produto_Pedido: Produto_PedidoRetorno) {
    if (Produto_Pedido) {
      this.Pedido_Produto.IdProduto = Produto_Pedido.IdProduto;
      this.Pedido_Produto.Preco = Produto_Pedido.Preco;
      this.Pedido_Produto.Quantidade = Produto_Pedido.Quantidade.toString();
      this.TotalProdutosGrade = this.TotalProdutosGrade - parseFloat(Produto_Pedido.PrecoFinal);
      this.TotalProdutos = this.TotalProdutosGrade.toFixed(2).replace(".", ",");
      console.log(this.TotalProdutosGrade);
      this.Produtos_PedidoRetorno.splice(this.Produtos_PedidoRetorno.indexOf(Produto_Pedido), 1)
    }
    if (this.Produtos_PedidoRetorno.length > 0) {
      this.nenhumProduto = false;
    } else {
      this.nenhumProduto = true;
    }
  }

  public selecionarProdutoPedido(Pedido_Produto: Pedido_Produto) {
    if (Pedido_Produto) {
      this.Pedido_Produto = Pedido_Produto;
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

  public PreecherComboFiltroProduto() {
    this.FiltrosProdutos = [
      {
        Codigo: "NC",
        Descricao: "Nome Comercial"
      },
      {
        Codigo: "NT",
        Descricao: "Nome Técnico"
      },
      {
        Codigo: "CI",
        Descricao: "Código Interno"
      }
    ]
  }

  async PesquisarClientePorFiltro() {
    let pesquisa: any;
    if (this.FiltroCliente == "NR") {
      pesquisa = { NomeRazao: this.InputFiltroPesquisa, Vinculos: [2] }
    } else if (this.FiltroCliente == "AF") {
      pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa, Vinculos: [2] }
    } else if (this.FiltroCliente == "C") {
      pesquisa = { CpfCnpj: this.InputFiltroPesquisa, Vinculos: [2] }
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
      if (retorno.status == 200) {
        this.Endereco = retorno.resultado.Enderecos[0].Logradouro + ', ' + retorno.resultado.Enderecos[0].Numero + ', ' + retorno.resultado.Enderecos[0].Bairro + ', ' + retorno.resultado.Enderecos[0].Cidade.Nome + '-' + retorno.resultado.Enderecos[0].Cidade.Estado.Sigla;
        this.Telefone = ' (' + retorno.resultado.Telefones[0].DDD + ') ' + retorno.resultado.Telefones[0].Numero
        this.Email = retorno.resultado.Emails[0].Endereco;
        this.Cliente = retorno.resultado;
      }
      this.ClienteEscolhido = true;
    }

  }

  public async alterarSituacao() {
    if (this.Pedido.IdStatus == '1') {
      this.tipoBtn = 'btn-success'
    } else if (this.Pedido.IdStatus == '2') {
      this.tipoBtn = 'btn-dark'
    } else if (this.Pedido.IdStatus == '3') {
      this.tipoBtn = 'btn-danger'
    } else if (this.Pedido.IdStatus == '4') {
      this.tipoBtn = 'btn-primary'
    }
  }

  async Pesquisar() {
    if (this.CodigoProduto == '') {
      this.modalSearch.nativeElement.click();
    } else {
      let retorno: any = await this.ProdutoService.BuscarPorId(this.Produto.IdProduto)
      if (retorno) {
        this.Produto = retorno;
      }
    }
  }


  async PesquisarPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisaProduto == "NT") {
      pesquisa = { NomeTecnico: this.InputFiltroPesquisaProduto }
    } else if (this.FiltroPesquisaProduto == "C") {
      pesquisa = { IdProduto: this.InputFiltroPesquisaProduto }
    } else if (this.FiltroPesquisaProduto == "CI") {
      pesquisa = { CodigoInterno: this.InputFiltroPesquisaProduto }
    } else if (this.FiltroPesquisaProduto == "NC") {
      pesquisa = { NomeComercial: this.InputFiltroPesquisaProduto }
    } else {
      this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.ProdutoService.BuscarPorFiltro(pesquisa);
    this.Produtos = retorno.resultado
  }

  public selecionarProduto(Produto: Produto) {
    if (this.Pedido.IdFormaPagamento == "") {
      this.AlertService.show("Selecione forma de pagamento", { classname: 'bg-danger text-light', delay: 3000 });
      return
    }
    if (Produto) {
      this.CodigoProduto = Produto.IdProduto;
      this.Pesquisar();
    }
  }

  public ValidarUsuario() {
    this.perfil = this.accountService.getTipoUser();
  }

  handlePageChangeProdutoModal(event) {
    this.paginaAtualProdutoModal = event;
  }

  handlePageChangePessoa(event) {
    this.paginaAtualPessoa = event;
  }

}

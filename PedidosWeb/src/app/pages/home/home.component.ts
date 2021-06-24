import { PessoaService } from './../../services/pessoa.service';
import { UsuarioService } from './../../services/usuario.service';
import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../services/account.service';
import { Pedido } from 'src/app/class/pedido';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  FiltroPesquisa: string;
  InputFiltroPesquisa: string;
  Filtros: any[];
  Pedidos: Pedido[];
  UsuarioLogado: any;
  public paginaAtual = 1;
  Perfil: String;
  Vendedor: String;

  constructor(private PedidoService: PedidoService, private accountService: AccountService, private UsuarioService: UsuarioService, private PessoaService: PessoaService) { }

  ngOnInit(): void {
    this.listarPedidos();
    this.PreecherComboFiltro();
  }

  async listarPedidos() {
    let pesquisa: any;
    this.Perfil = this.accountService.getTipoUser();
    const usuario = this.accountService.getUsuario();
    if (this.Perfil == "3") {
      if (usuario) {
        pesquisa = { IdUsuarioCriadoPor: usuario }
        let retorno: any = await this.PedidoService.BuscarPorFiltro(pesquisa);

        retorno.resultado.forEach(Pedido => {
          Pedido.Total = parseFloat(Pedido.Total).toFixed(2).replace(".", ",");
        });
        this.Pedidos = retorno.resultado;
      }
    } else {
      pesquisa = { IdUsuarioCriadoPor: null }
      let retorno: any = await this.PedidoService.BuscarPorFiltro(pesquisa);

      retorno.resultado.forEach(Pedido => {
        Pedido.Total = parseFloat(Pedido.Total).toFixed(2).replace(".", ",");
      });
      this.Pedidos = retorno.resultado;
    }

  }

  async PesquisarPedidoPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisa == "NC") {
      pesquisa = { Pessoa: { NomeRazao: this.InputFiltroPesquisa }, IdPessoa: this.Vendedor }
    } else if (this.FiltroPesquisa == "S") {
      if (this.InputFiltroPesquisa == "Aberto") {
        status = "1";
      } else if (this.InputFiltroPesquisa == "Separação") {
        status = "2";
      } else if (this.InputFiltroPesquisa == "Cancelado") {
        status = "3";
      } else if (this.InputFiltroPesquisa == "Entregue") {
        status = "4";
      } else {
        status = "100";
      }
      pesquisa = { Status: { IdStatusPedido: status }, IdPessoa: this.Vendedor }
    } else {
      //this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    let retorno: any = await this.PedidoService.BuscarPorFiltro(pesquisa);
    retorno.resultado.forEach(Pedido => {
      Pedido.Total = parseFloat(Pedido.Total).toFixed(2).replace(".", ",");
    });
    this.Pedidos = retorno.resultado;
  }

  public PreecherComboFiltro() {
    this.Filtros = [
      {
        Codigo: "NC",
        Descricao: "Nome Cliente"
      },
      {
        Codigo: "S",
        Descricao: "Situação"
      },
    ]
  }

}

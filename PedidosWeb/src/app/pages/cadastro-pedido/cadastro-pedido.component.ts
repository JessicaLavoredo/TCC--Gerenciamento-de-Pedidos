import { FormaPagamento } from './../../class/forma-pagamento';
import { Pedido } from 'src/app/class/pedido';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Produto_Pedido } from 'src/app/class/Produto_Pedido';
import { PedidoService } from './../../services/pedido.service';
import { MatAccordion } from '@angular/material/expansion';
import { Cliente } from 'src/app/class/cliente';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {
  public Pedido: Pedido = new Pedido();
  public Cliente: Cliente = new Cliente();
  public Produto_Pedido: Produto_Pedido = new Produto_Pedido();
  public Produtos_Pedido: Produto_Pedido[] = [];
  public FormasPagamento: FormaPagamento[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;
  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.listarFormaPagamento()
    this.Cliente.nomeRazao = 'Jessica Maiara Lavoredo'
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
    this.Produtos_Pedido.push(this.Produto_Pedido)
    this.Produto_Pedido = new Produto_Pedido();
  }

  public limparProduto() {
    this.Produto_Pedido = new Produto_Pedido();
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
}

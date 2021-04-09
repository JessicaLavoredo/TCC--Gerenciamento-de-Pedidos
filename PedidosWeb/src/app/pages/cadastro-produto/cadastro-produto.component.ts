import { ProdutoService } from './../../services/produto.service';
import { Produto } from './../../class/produto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  public Produto: Produto = new Produto();
  public Produtos: Produto[] = [];
  public paginaAtual = 1;
  public filter;

  @ViewChild('modalSearch') modalSearch: ElementRef;
  constructor(private ProdutoService: ProdutoService, private router: Router) { }
  ngOnInit(): void {

  }

  public Limpar() {
    this.Produto = new Produto();
  }

  public async Gravar() {
    try {
      var retorno = await this.ProdutoService.gravar(this.Produto)
      alert(retorno.data)
      this.Limpar();

    } catch (error) {
      console.error(error);
    }
  }

  public ListarTodos() {
    this.ProdutoService.buscarTodos().subscribe(result => {
      this.Produtos = result;
    });
  }

  async Pesquisar() {
    this.ListarTodos();
    if (this.Produto.idProduto == '') {
      this.modalSearch.nativeElement.click();
    } else {
      let ProdutoRetorno = this.Produtos.filter(produto => produto.idProduto === this.Produto.idProduto);
      this.Produto = ProdutoRetorno[0];
    }
  }

  public selecionarProduto(Produto: Produto) {
    if (Produto) {
      this.Produto = Produto;
    }
  }



}

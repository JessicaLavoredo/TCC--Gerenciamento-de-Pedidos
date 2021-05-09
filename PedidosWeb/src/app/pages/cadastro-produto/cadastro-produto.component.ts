import { ProdutoService } from './../../services/produto.service';
import { Produto } from './../../class/produto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

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
  queryProduto = new FormControl();

  @ViewChild('modalSearch') modalSearch: ElementRef;
  constructor(private ProdutoService: ProdutoService, private router: Router) { }
  ngOnInit(): void {
    this.Limpar()
  }

  public Limpar() {
    this.Produto = new Produto();
    this.DepoisBuscar()
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
      let retorno: any = await this.ProdutoService.BuscarPorId(this.Produto.idProduto)
      if (retorno) {
        this.Produto = retorno;
      }
    }
  }

  public selecionarProduto(Produto: Produto) {
    if (Produto) {
      this.Produto.idProduto = Produto.idProduto;
      this.Pesquisar();
    }
  }

  public DepoisBuscar() {
    this.queryProduto.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.ProdutoService.BuscarPorId(this.Produto.idProduto)),
      map((result: any) => {
        if (result) {
          this.Produto = result;
        } else {

        }
      }
      )
    ).subscribe();
  }

}

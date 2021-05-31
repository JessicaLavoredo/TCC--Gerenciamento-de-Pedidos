import { ProdutoService } from './../../services/produto.service';
import { Produto } from './../../class/produto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinct, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  public Produto: Produto = new Produto();
  public ProdutoRetorno: Produto = new Produto();
  public Produtos: Produto[] = [];
  public paginaAtual = 1;
  public filter;
  queryProduto = new FormControl();
  queryProdutoCodigoInterno = new FormControl();
  FiltroPesquisa: string;
  InputFiltroPesquisa: string;
  Filtros: any[];

  @ViewChild('abrirmodalConfirmacao') abrirmodalConfirmacao: ElementRef;
  @ViewChild('modalSearch') modalSearch: ElementRef;
  validacao: boolean;
  constructor(private ProdutoService: ProdutoService, private router: Router, private AlertService: AlertService) { }
  ngOnInit(): void {
    this.Limpar()
  }

  public Limpar() {
    this.Produto = new Produto();
    this.DepoisBuscar();
    this.PreecherComboFiltro();
  }

  public PreecherComboFiltro() {
    this.Filtros = [
      {
        Codigo: "C",
        Descricao: "Código"
      },
      {
        Codigo: "CI",
        Descricao: "Código Interno"
      },
      {
        Codigo: "NT",
        Descricao: "Nome Técnico"
      },
      {
        Codigo: "NC",
        Descricao: "Nome Comercial"
      },
      {
        Codigo: "D",
        Descricao: "Descrição"
      }
    ]
  }

  public async Gravar() {
    try {
      this.validacao = true;
      if (this.Produto.Descricao == '') {
        this.AlertService.show("Preenche corretamente o campo Descrição", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }
      if (this.Produto.NomeComercial == '') {
        this.AlertService.show("Preenche corretamente o campo Nome Comercial", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }
      if (this.Produto.Prazo == '') {
        this.AlertService.show("Preenche corretamente o campo Preço a Prazo", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.Produto.Vista == '') {
        this.AlertService.show("Preenche corretamente o campo Preço a Prazo", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (this.Produto.CodigoInterno.length <= 1) {
        this.AlertService.show("O Código interno precisa ter pelo menos 2 Digitos", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (!this.validacao) {
        return
      }

      let retorno: any = await this.ProdutoService.gravar(this.Produto)
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
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
    if (this.Produto.IdProduto == '') {
      this.modalSearch.nativeElement.click();
    } else {
      let retorno: any = await this.ProdutoService.BuscarPorId(this.Produto.IdProduto)
      if (retorno) {
        this.Produto = retorno;
      }
    }
  }

  public selecionarProduto(Produto: Produto) {
    if (Produto) {
      this.Produto.IdProduto = Produto.IdProduto;
      this.Pesquisar();
    }
  }

  public DepoisBuscar() {
    this.queryProduto.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 0),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.ProdutoService.BuscarPorId(this.Produto.IdProduto)),
      map((result: any) => {
        if (result) {
          this.Produto = result;
        } else {
          this.AlertService.show("Registro não encontrado", { classname: 'bg-danger text-light', delay: 3000 });
          this.Limpar();
          return
        }
      }
      )
    ).subscribe();
  }

  async PesquisarPorFiltro() {
    if (this.FiltroPesquisa == "NT") {
      var pesquisa = { nomeTecnico: this.InputFiltroPesquisa }
      let retorno: any = await this.ProdutoService.BuscarPorFiltro(pesquisa);
      this.Produtos = retorno
    }
  }
  // public preencheProduto() {
  //   this.Produto.IdProduto = this.ProdutoRetorno.IdProduto;
  //   this.ProdutoRetorno = new Produto;
  // }

  // public CancelarpreencheProduto() {
  //   this.Limpar()
  //   this.ProdutoRetorno = new Produto;
  // }


}

import { ProdutoService } from './../../services/produto.service';
import { Produto } from './../../class/produto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  public Produto: Produto = new Produto();

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

}

import { ListaPrecoService } from './../../services/lista-preco.service';
import { ListaPreco } from './../../class/lista-preco';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-lista-preco',
  templateUrl: './cadastro-lista-preco.component.html',
  styleUrls: ['./cadastro-lista-preco.component.css']
})
export class CadastroListaPrecoComponent implements OnInit {
  public ListasPreco: ListaPreco[] = [];
  public ListaPreco: ListaPreco = new ListaPreco();

  constructor(private ListaPrecoService: ListaPrecoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.ListaPrecoService.buscarTodos().subscribe(result => {
      this.ListasPreco = result;
    });
  }
  public async Gravar() {
    try {
      await this.ListaPrecoService.gravar(this.ListaPreco);
      this.listar();
      this.ListaPreco = new ListaPreco();
    } catch (error) {
      console.error(error);
    }
  }

  public selecionarListaPreco(listapreco: ListaPreco) {
    if (listapreco) {
      this.ListaPreco = listapreco;
    }
  }

  public Limpar() {
    this.ListaPreco = new ListaPreco();
  }
}

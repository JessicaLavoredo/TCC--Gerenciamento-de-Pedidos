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

  constructor( private ListaPrecoService: ListaPrecoService, private router: Router) { }

  ngOnInit(): void {
    this.ListaPrecoService.buscarTodos().subscribe( result => {
              this.ListasPreco = result;
     });
  }
}

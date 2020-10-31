import { CategoriaTelefoneService } from './../../services/categoria-telefone.service';
import { CategoriaTelefone } from '../../class/categoria-telefone';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cat-telefone',
  templateUrl: './cadastro-cat-telefone.component.html',
  styleUrls: ['./cadastro-cat-telefone.component.css']
})
export class CadastroCatTelefoneComponent implements OnInit { 
  public categorias: CategoriaTelefone[] = [];
  public filter;
  constructor( private CategoriaTelefoneService: CategoriaTelefoneService, private router: Router) { }

  ngOnInit(): void {
    this.CategoriaTelefoneService.buscarTodos().subscribe( result => {
              this.categorias = result;
     });
  }   
}

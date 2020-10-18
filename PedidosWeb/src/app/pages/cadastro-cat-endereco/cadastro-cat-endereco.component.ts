import { CategoriaEndereco } from './../../categoria-endereco';
import { CategoriaEnderecoService } from './../../services/categoria-endereco.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cat-endereco',
  templateUrl: './cadastro-cat-endereco.component.html',
  styleUrls: ['./cadastro-cat-endereco.component.css']
})
export class CadastroCatEnderecoComponent implements OnInit {

  public categorias: CategoriaEndereco[] = [];

  constructor( private CategoriaEnderecoService: CategoriaEnderecoService, private router: Router) { }

  ngOnInit(): void {
    this.CategoriaEnderecoService.buscarTodos().subscribe( result => {
              this.categorias = result;
     });
  }

}

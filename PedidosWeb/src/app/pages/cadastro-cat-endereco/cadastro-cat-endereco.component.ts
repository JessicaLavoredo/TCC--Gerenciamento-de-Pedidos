import { CategoriaEndereco } from '../../class/categoria-endereco';
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
  public categoria: CategoriaEndereco = new CategoriaEndereco();
  constructor(private CategoriaEnderecoService: CategoriaEnderecoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.CategoriaEnderecoService.buscarTodos().subscribe(result => {
      this.categorias = result;
    });
  }
  public async Gravar() {
    try {
      await this.CategoriaEnderecoService.gravar(this.categoria);
      this.listar();
      this.categoria = new CategoriaEndereco();
    } catch (error) {
      console.error(error);
    }
  }

  public selecionarCategoria(categoria: CategoriaEndereco) {
    if (categoria) {
      this.categoria = categoria;
    }
  }


  public Limpar() {
    this.categoria = new CategoriaEndereco();
  }

}

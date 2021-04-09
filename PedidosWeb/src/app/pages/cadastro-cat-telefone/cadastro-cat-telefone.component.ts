import { CategoriaTelefone } from './../../class/categoria-telefone';
import { CategoriaTelefoneService } from './../../services/categoria-telefone.service';
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
  public categoria: CategoriaTelefone = new CategoriaTelefone();
  constructor(private CategoriaTelefoneService: CategoriaTelefoneService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.CategoriaTelefoneService.buscarTodos().subscribe(result => {
      this.categorias = result;
    });
  }
  public async Gravar() {
    try {
      await this.CategoriaTelefoneService.gravar(this.categoria);
      this.listar();
      this.categoria = new CategoriaTelefone();
    } catch (error) {
      console.error(error);
    }
  }

  public selecionarCategoria(categoria: CategoriaTelefone) {
    if (categoria) {
      this.categoria = categoria;
    }
    this.listar();
  }

  public Limpar() {
    this.categoria = new CategoriaTelefone();
  }

}

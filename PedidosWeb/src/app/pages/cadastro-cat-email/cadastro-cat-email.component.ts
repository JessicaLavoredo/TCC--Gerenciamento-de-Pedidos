import { CategoriaEmailService } from '../../services/categoria-email.service';
import { CategoriaEmail } from '../../class/categoria-email';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cat-email',
  templateUrl: './cadastro-cat-email.component.html',
  styleUrls: ['./cadastro-cat-email.component.css']
})
export class CadastroCatEmailComponent implements OnInit {

  public categorias: CategoriaEmail[] = [];
  public categoria: CategoriaEmail = new CategoriaEmail();
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;

  constructor(private CategoriaEmailService: CategoriaEmailService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.CategoriaEmailService.buscarTodos().subscribe(result => {
      this.categorias = result;
    });
  }

  public async Gravar() {
    try {
      await this.CategoriaEmailService.gravar(this.categoria);
      this.listar();
      this.categoria = new CategoriaEmail();
    } catch (error) {
      console.error(error);
    }
  }

  public selecionarCategoria(categoria: CategoriaEmail) {
    if (categoria) {
      this.categoria = categoria;
    }
    this.listar();
  }

  public Limpar() {
    this.categoria = new CategoriaEmail();
  }
}

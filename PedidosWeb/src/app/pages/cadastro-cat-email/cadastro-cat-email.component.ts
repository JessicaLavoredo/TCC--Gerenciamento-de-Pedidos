import { CategoriaEmailService } from '../../services/categoria-email.service';
import { CategoriaEmail } from '../../class/categoria-email';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-cadastro-cat-email',
  templateUrl: './cadastro-cat-email.component.html',
  styleUrls: ['./cadastro-cat-email.component.css']
})
export class CadastroCatEmailComponent implements OnInit {

  public categorias: CategoriaEmail[] = [];
  public categoria: CategoriaEmail = new CategoriaEmail();
  @ViewChild('modalSearchPessoa') modalSearchPessoa: ElementRef;

  constructor(private CategoriaEmailService: CategoriaEmailService, private router: Router, private AlertService: AlertService) { }

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
      let retorno = await this.CategoriaEmailService.gravar(this.categoria);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.data, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.data, { classname: 'bg-danger text-light', delay: 3000 });
      }
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

  public async Excluir() {
    try {
      let retorno = await this.CategoriaEmailService.excluir(this.categoria);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.data, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.data, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.categoria = new CategoriaEmail();
    } catch (error) {
      console.error(error);
    }
  }
}

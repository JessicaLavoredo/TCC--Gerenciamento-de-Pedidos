import { CategoriaTelefone } from './../../class/categoria-telefone';
import { CategoriaTelefoneService } from './../../services/categoria-telefone.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-cadastro-cat-telefone',
  templateUrl: './cadastro-cat-telefone.component.html',
  styleUrls: ['./cadastro-cat-telefone.component.css']
})
export class CadastroCatTelefoneComponent implements OnInit {
  public categorias: CategoriaTelefone[] = [];
  public filter;
  public categoria: CategoriaTelefone = new CategoriaTelefone();
  validacao: boolean;
  constructor(private CategoriaTelefoneService: CategoriaTelefoneService, private router: Router, private AlertService: AlertService) { }

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
      this.validacao = true;
      if (this.categoria.Nome == '') {
        this.AlertService.show("Preencha corretamente o campo Nome", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (!this.validacao) {
        return
      }
      let retorno: any = await this.CategoriaTelefoneService.gravar(this.categoria);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
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

  public async Excluir() {
    try {
      let retorno: any = await this.CategoriaTelefoneService.excluir(this.categoria);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.categoria = new CategoriaTelefone();
    } catch (error) {
      console.error(error);
    }
  }
}

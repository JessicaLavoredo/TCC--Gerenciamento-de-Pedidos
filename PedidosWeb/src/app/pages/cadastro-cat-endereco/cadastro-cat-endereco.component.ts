import { CategoriaEndereco } from '../../class/categoria-endereco';
import { CategoriaEnderecoService } from './../../services/categoria-endereco.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-cadastro-cat-endereco',
  templateUrl: './cadastro-cat-endereco.component.html',
  styleUrls: ['./cadastro-cat-endereco.component.css']
})
export class CadastroCatEnderecoComponent implements OnInit {

  public categorias: CategoriaEndereco[] = [];
  public categoria: CategoriaEndereco = new CategoriaEndereco();
  constructor(private CategoriaEnderecoService: CategoriaEnderecoService, private router: Router, private AlertService: AlertService) { }

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
      let retorno = await this.CategoriaEnderecoService.gravar(this.categoria);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.data, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.data, { classname: 'bg-danger text-light', delay: 3000 });
      }
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
    this.listar();
  }


  public Limpar() {
    this.categoria = new CategoriaEndereco();
  }

  public async Excluir() {
    try {
      let retorno = await this.CategoriaEnderecoService.excluir(this.categoria);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.data, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.data, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.categoria = new CategoriaEndereco();
    } catch (error) {
      console.error(error);
    }
  }

}

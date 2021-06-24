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
  validacao: boolean;
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

      this.validacao = true;
      if (this.categoria.Nome == '') {
        this.AlertService.show("Preencha corretamente o campo Nome", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }
      if (!this.validacao) {
        return
      }
      let IdCategoriaEndereco;
      IdCategoriaEndereco = this.categoria.IdCategoriaEndereco

      let retorno: any = await this.CategoriaEnderecoService.gravar(this.categoria);
      if (retorno.status == 200) {
        if (IdCategoriaEndereco == '' || IdCategoriaEndereco == null) {
          this.CategoriaEnderecoService.buscarTodos().subscribe(result => {
            this.categorias = result;
            this.AlertService.show('Registro ' + result.pop().IdCategoriaEndereco + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
          });
        } else {
          this.AlertService.show('Registro ' + IdCategoriaEndereco + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
        }

      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.categoria = new CategoriaEndereco();
      IdCategoriaEndereco = null;
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
      let retorno: any = await this.CategoriaEnderecoService.excluir(this.categoria);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.categoria = new CategoriaEndereco();
    } catch (error) {
      console.error(error);
    }
  }

}

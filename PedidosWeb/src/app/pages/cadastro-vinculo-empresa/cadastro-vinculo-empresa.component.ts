import { Vinculo } from './../../class/vinculo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VinculoEmpresaService } from 'src/app/services/vinculo-empresa.service';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-cadastro-vinculo-empresa',
  templateUrl: './cadastro-vinculo-empresa.component.html',
  styleUrls: ['./cadastro-vinculo-empresa.component.css']
})
export class CadastroVinculoEmpresaComponent implements OnInit {

  public vinculos: Vinculo[] = [];
  public vinculo: Vinculo = new Vinculo();
  validacao: boolean;
  constructor(private VinculoEmpresaService: VinculoEmpresaService, private router: Router, private AlertService: AlertService) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.VinculoEmpresaService.buscarTodos().subscribe(result => {
      this.vinculos = result;
    });
  }
  public async Gravar() {
    try {
      this.validacao = true;
      if (this.vinculo.Nome == '') {
        this.AlertService.show("Preencha corretamente o campo Nome", { classname: 'bg-danger text-light', delay: 3000 });
        this.validacao = false;
      }

      if (!this.validacao) {
        return
      }

      let IdVinculo;
      IdVinculo = this.vinculo.IdVinculo

      let retorno: any = await this.VinculoEmpresaService.gravar(this.vinculo);
      if (retorno.status == 200) {
        if (IdVinculo == '' || IdVinculo == null) {
          this.VinculoEmpresaService.buscarTodos().subscribe(result => {
            this.AlertService.show('Registro ' + result.pop().IdVinculo + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
          });
        } else {
          this.AlertService.show('Registro ' + IdVinculo + ' Gravado com sucesso', { classname: 'bg-success text-light', delay: 3000 });
        }
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.vinculo = new Vinculo();
    } catch (error) {
      console.error(error);
    }
  }

  public selecionarVinculo(Vinculo: Vinculo) {
    if (Vinculo) {
      this.vinculo = Vinculo;
    }
  }

  public Limpar() {
    this.vinculo = new Vinculo();
  }

  public async Excluir() {
    try {
      let retorno: any = await this.VinculoEmpresaService.excluir(this.vinculo);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.vinculo = new Vinculo();
    } catch (error) {
      console.error(error);
    }
  }

}

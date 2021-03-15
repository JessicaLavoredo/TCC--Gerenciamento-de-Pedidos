import { Vinculo } from './../../class/vinculo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VinculoEmpresaService } from 'src/app/services/vinculo-empresa.service';

@Component({
  selector: 'app-cadastro-vinculo-empresa',
  templateUrl: './cadastro-vinculo-empresa.component.html',
  styleUrls: ['./cadastro-vinculo-empresa.component.css']
})
export class CadastroVinculoEmpresaComponent implements OnInit {

  public vinculos: Vinculo[] = [];
  public vinculo: Vinculo = new Vinculo();
  constructor( private VinculoEmpresaService: VinculoEmpresaService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar(){
    this.VinculoEmpresaService.buscarTodos().subscribe( result => {
      this.vinculos = result;
  });
    }
  public async Gravar(){
    try{
      await this.VinculoEmpresaService.gravar(this.vinculo);
      this.listar();
      this.vinculo = new Vinculo();
      }catch (error){
        console.error(error);
      }
  }

  public selecionarVinculo(Vinculo: Vinculo) {
    if ( Vinculo ) {
      this.vinculo = Vinculo;
    }
  }

  public Limpar() {
      this.vinculo = new Vinculo();
  }


}

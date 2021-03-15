import { Cidade } from './../../interface/cidade';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaEndereco } from 'src/app/class/categoria-endereco';
import { CategoriaEmail } from 'src/app/class/categoria-email';
import { CategoriaTelefone } from 'src/app/class/categoria-telefone';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {
  public Cidades: Cidade[] = [];
  public cidade: Cidade = {IdCidade: '', IdEstado: '', Codigo_IBGE: '', Nome: ''};
  public filter;
  public labelCidade = '' ;
  constructor(private FuncionarioService: FuncionarioService, private router: Router) { }
  public categoriasEndereco: CategoriaEndereco[] = [];
  public categoriasEmail: CategoriaEmail[] = [];
  public categoriasTelefone: CategoriaTelefone[] = [];

    ngOnInit(): void {
      this.listarCatEndereco();
      this.listarCatEmail();
      this.listarCatTelefone();
    }
 
  public PesquisarCidade() {
    this.FuncionarioService.buscarTodasCidades().subscribe( result => {
      this.Cidades = result;
  });
  }

  public selecionarCidade(Cidade: Cidade) {
    if ( Cidade ) {
      this.labelCidade = Cidade.Nome;
      this.cidade = Cidade;
    }
  }

  public listarCatEndereco(){
    this.FuncionarioService.buscarTodosCatEnderecos().subscribe( result => {
      this.categoriasEndereco = result;
    });
  }

  public listarCatEmail(){
    this.FuncionarioService.buscarTodosCatEmails().subscribe( result => {
      this.categoriasEmail = result;
    });
  }

  public listarCatTelefone(){
    this.FuncionarioService.buscarTodosCatTelefones().subscribe( result => {
      this.categoriasTelefone = result;
    });
  }
}

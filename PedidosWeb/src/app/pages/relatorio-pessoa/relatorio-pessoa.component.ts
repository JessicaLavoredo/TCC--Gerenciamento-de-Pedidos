import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/class/Pessoa';
import { PessoaService } from './../../services/pessoa.service';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-relatorio-pessoa',
  templateUrl: './relatorio-pessoa.component.html',
  styleUrls: ['./relatorio-pessoa.component.css']
})
export class RelatorioPessoaComponent implements OnInit {
  public PessoaFiltro: Pessoa = new Pessoa();
  NomePagina: string = "";
  perfil: string = '';
  DataNascimento: Date;
  constructor(private PessoaService: PessoaService, private AlertService: AlertService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.ValidarUsuario()
    this.limparTela()
  }
  public ValidarUsuario() {
    this.perfil = this.accountService.getTipoUser();
    if (this.perfil == "1") {
      this.NomePagina = "Relatório de Pessoa"
    } else {
      this.NomePagina = "Relatório de Cliente"
    }
  }

  limparTela() {

  }

  public async Gerar() {
  }
}

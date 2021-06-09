import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/class/Pessoa';
import { PessoaService } from './../../services/pessoa.service';
import { AlertService } from './../../services/alert.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PessoaFiltro } from 'src/app/class/PessoaFiltro';

@Component({
  selector: 'app-relatorio-pessoa',
  templateUrl: './relatorio-pessoa.component.html',
  styleUrls: ['./relatorio-pessoa.component.css']
})
export class RelatorioPessoaComponent implements OnInit {
  public PessoaFiltro: PessoaFiltro = new PessoaFiltro();
  PessoasFiltro: any[];
  NomePagina: string = "";
  perfil: string = '';
  DataNascimento: Date;
  public cpfMask = '000.000.000-00';
  public rgMask = '00.000.000-0';
  dataNascimento: Date;
  FiltroVinculos: any[];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

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
    console.log(this.PessoaFiltro)
    let retorno: any = await this.PessoaService.BuscarPorFiltro(this.PessoaFiltro);
    this.PessoasFiltro = retorno.resultado
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  FiltroPesquisa: string;
  InputFiltroPesquisa: string;
  Filtros: any[];

  constructor() { }

  ngOnInit(): void {
  }

  async PesquisarPedidoPorFiltro() {
    let pesquisa: any;
    if (this.FiltroPesquisa == "NR") {
      pesquisa = { NomeRazao: this.InputFiltroPesquisa }
    } else if (this.FiltroPesquisa == "AF") {
      pesquisa = { ApelidoFantasia: this.InputFiltroPesquisa }
    } else if (this.FiltroPesquisa == "C") {
      pesquisa = { CpfCnpj: this.InputFiltroPesquisa }
    } else {
      //this.AlertService.show("Selecione o filtro de Pesquisa", { classname: 'bg-warning text-light', delay: 3000 });
      return
    }
    //let retorno: any = await this.PessoaService.BuscarPorFiltro(pesquisa);
    // this.Pessoas = retorno.resultado
  }

  public PreecherComboFiltro() {
    this.Filtros = [
      {
        Codigo: "NR",
        Descricao: "Nome/Razão Social"
      },
      {
        Codigo: "AF",
        Descricao: "Apelido/Nome Fantasia"
      },
      {
        Codigo: "C",
        Descricao: "CPF/CNPJ"
      }
    ]
  }

}

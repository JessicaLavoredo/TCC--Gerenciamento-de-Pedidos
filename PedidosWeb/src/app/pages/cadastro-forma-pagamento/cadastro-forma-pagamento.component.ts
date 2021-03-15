import { FormaPagamentoService } from './../../services/forma-pagamento.service';
import { FormaPagamento } from './../../class/forma-pagamento';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-forma-pagamento',
  templateUrl: './cadastro-forma-pagamento.component.html',
  styleUrls: ['./cadastro-forma-pagamento.component.css']
})
export class CadastroFormaPagamentoComponent implements OnInit {
  public FormasPagamento: FormaPagamento[] = [];
  public FormaPagamento: FormaPagamento = new FormaPagamento();
  constructor( private FormaPagamentoService: FormaPagamentoService, private router: Router) { }
  ngOnInit(): void {
    this.listar();
  }

  public listar(){
    this.FormaPagamentoService.buscarTodos().subscribe( result => {
      this.FormasPagamento = result;
  });
    }
  public async Gravar(){
    try{
      await this.FormaPagamentoService.gravar(this.FormaPagamento);
      this.listar();
      this.FormaPagamento = new FormaPagamento();
      }catch (error){
        console.error(error);
      }
  }

  public selecionarFormaPagamento(formapagamento: FormaPagamento) {
    if ( formapagamento ) {
      this.FormaPagamento = formapagamento;
    }
  }

  public Limpar() {
      this.FormaPagamento = new FormaPagamento();
  }

}

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

  constructor( private FormaPagamentoService: FormaPagamentoService, private router: Router) { }

  ngOnInit(): void {
    this.FormaPagamentoService.buscarTodos().subscribe( result => {
              this.FormasPagamento = result;
     });
  }

}

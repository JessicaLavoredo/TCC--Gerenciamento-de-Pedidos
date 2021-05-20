import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormaPagamento } from '../class/forma-pagamento';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<FormaPagamento[]>('api/FormaPagamento/buscartodos');
  }

  async gravar(formapag: FormaPagamento) {
    return new Promise(resolve => {
      const json = JSON.stringify(formapag);
      this.http.post('api/FormaPagamento/gravar', json).subscribe(result => {
        let resultado = {
          resultado: result,
          status: 200
        };
        resolve(resultado);
      }, error => {
        let resultado = {
          resultado: error,
          status: 401
        };
        resolve(resultado);
      });
    })
  }

  async excluir(formapag: FormaPagamento) {
    return new Promise(resolve => {
      const json = JSON.stringify(formapag);
      this.http.post('api/FormaPagamento/deletar', json).subscribe(result => {
        let resultado = {
          resultado: result,
          status: 200
        };
        resolve(resultado);
      }, error => {
        let resultado = {
          resultado: error,
          status: 401
        };
        resolve(resultado);
      });
    })

  }

}



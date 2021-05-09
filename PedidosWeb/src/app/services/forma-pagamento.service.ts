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
    return this.http.get<FormaPagamento[]>(environment.api + 'FormaPagamento/buscartodos');
  }

  async gravar(formapag: FormaPagamento) {
    const json = JSON.stringify(formapag);
    const result: any = await Api.post('FormaPagamento/gravar', json);
    console.log(result);
    if (result) {
      return result;
    }
  }

  async excluir(formapag: FormaPagamento) {
    const json = JSON.stringify(formapag);
    const result: any = await Api.post('FormaPagamento/deletar', json);
    console.log(result);
    if (result) {
      return result;
    }
  }

}

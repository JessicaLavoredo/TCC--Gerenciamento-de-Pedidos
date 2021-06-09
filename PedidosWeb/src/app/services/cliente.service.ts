import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../class/cliente';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<Cliente[]>('api/CategoriaEmail/buscartodos');
  }

  async gravar(cliente: Cliente) {
    const json = JSON.stringify(cliente);
    const result: any = await Api.post('CategoriaEmail/gravar', json);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

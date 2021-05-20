import { CategoriaTelefone } from '../class/categoria-telefone';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaTelefoneService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<CategoriaTelefone[]>('api/CategoriaTelefone/buscartodos');
  }

  async gravar(categoria: CategoriaTelefone) {
    return new Promise(resolve => {
      const json = JSON.stringify(categoria);
      this.http.post('api/CategoriaTelefone/gravar', json).subscribe(result => {
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
  async excluir(categoria: CategoriaTelefone) {
    return new Promise(resolve => {
      const json = JSON.stringify(categoria);
      this.http.post('api/CategoriaTelefone/deletar', json).subscribe(result => {
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



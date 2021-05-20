import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaEmail } from '../class/categoria-email';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEmailService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<CategoriaEmail[]>('api/CategoriaEmail/buscartodos');
  }

  public gravar(categoria: CategoriaEmail) {
    return new Promise(resolve => {
      const json = JSON.stringify(categoria);
      this.http.post('api/CategoriaEmail/gravar', json).subscribe(result => {
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

  async excluir(categoria: CategoriaEmail) {
    return new Promise(resolve => {
      const json = JSON.stringify(categoria);
      this.http.post('api/CategoriaEmail/deletar', json).subscribe(result => {
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

import { CategoriaEndereco } from '../class/categoria-endereco';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEnderecoService {

  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<CategoriaEndereco[]>('api/CategoriaEndereco/buscartodos');
  }

  async gravar(categoria: CategoriaEndereco) {
    return new Promise(resolve => {
      const json = JSON.stringify(categoria);
      this.http.post('api/CategoriaEndereco/gravar', json).subscribe(result => {
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

  async excluir(categoria: CategoriaEndereco) {
    return new Promise(resolve => {
      const json = JSON.stringify(categoria);
      this.http.post('api/CategoriaEndereco/deletar', json).subscribe(result => {
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

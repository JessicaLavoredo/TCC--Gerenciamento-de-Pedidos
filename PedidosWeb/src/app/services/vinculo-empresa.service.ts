import { Vinculo } from './../class/vinculo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class VinculoEmpresaService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<Vinculo[]>('api/Vinculo/buscartodos');
  }

  async gravar(vinculo: Vinculo) {
    return new Promise(resolve => {
      const json = JSON.stringify(vinculo);
      this.http.post('api/Vinculo/gravar', json).subscribe(result => {
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

  async excluir(vinculo: Vinculo) {
    return new Promise(resolve => {
      const json = JSON.stringify(vinculo);
      this.http.post('api/Vinculo/deletar', json).subscribe(result => {
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

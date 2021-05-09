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
    return this.http.get<CategoriaEndereco[]>(environment.api + 'CategoriaEndereco/buscartodos');
  }

  async gravar(categoria: CategoriaEndereco) {
    const json = JSON.stringify(categoria);
    const result: any = await Api.post('CategoriaEndereco/gravar', json);
    if (result) {
      return result;
    }
  }

  async excluir(categoria: CategoriaEndereco) {
    const json = JSON.stringify(categoria);
    const result: any = await Api.post('CategoriaEndereco/deletar', json);
    if (result) {
      return result;
    }
  }
}

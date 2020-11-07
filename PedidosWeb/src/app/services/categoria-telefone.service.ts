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

  public buscarTodos(){
    return this.http.get<CategoriaTelefone[]>(environment.api + 'CategoriaTelefone/buscartodos');
  }

  async gravar(categoria: CategoriaTelefone){
    const json = JSON.stringify(categoria);
    const result: any =  await Api.post('CategoriaTelefone/gravar', json);
    if (result.length > 0){
        console.log(result);
        return true;
      }else{
      return false;
      }
    }
}

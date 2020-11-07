import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaEmail } from '../class/categoria-email';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEmailService {
  constructor(private http: HttpClient) { }

  public buscarTodos(){
    return this.http.get<CategoriaEmail[]>(environment.api + 'CategoriaEmail/buscartodos');
  }

  async gravar(categoria: CategoriaEmail){
    const json = JSON.stringify(categoria);
    const result: any =  await Api.post('CategoriaEmail/gravar', json);
    if (result.length > 0){
        console.log(result);
        return true;
      }else{
      return false;
      }
    }
}

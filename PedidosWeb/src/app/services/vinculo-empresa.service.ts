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

  public buscarTodos(){
    return this.http.get<Vinculo[]>(environment.api + 'Vinculo/buscartodos');
  }

  async gravar(vinculo: Vinculo){
    const json = JSON.stringify(vinculo);
    const result: any =  await Api.post('Vinculo/gravar', json);
    console.log(result);
    if (result.length > 0){
        return true;
      }else{
      return false;
      }
    }
}

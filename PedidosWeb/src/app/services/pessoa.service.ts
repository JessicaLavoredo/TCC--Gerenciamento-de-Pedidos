import { Vinculo } from './../class/vinculo';
import { Cidade } from './../class/cidade';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaEndereco } from '../class/categoria-endereco';
import { CategoriaEmail } from '../class/categoria-email';
import { CategoriaTelefone } from '../class/categoria-telefone';
import { Pessoa } from '../class/Pessoa';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }
  public buscarTodos() {
    return this.http.get<Pessoa[]>('api/Pessoa/buscartodos');
  }

  async gravar(pessoa: Pessoa) {
    return new Promise(resolve => {
      const json = JSON.stringify(pessoa);
      this.http.post('api/Pessoa/gravar', json).subscribe(result => {
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

  buscaPorCEP(Cep: String) {
    return new Promise(resolve => {
      this.http.get('//viacep.com.br/ws/' + Cep + '/json/').subscribe(result => {
        resolve(result);
      });
    })
  }

  public buscarTodosCatEnderecos() {
    return this.http.get<CategoriaEndereco[]>('api/CategoriaEndereco/buscartodos');
  }

  public buscarTodosCatEmails() {
    return this.http.get<CategoriaEmail[]>('api/CategoriaEmail/buscartodos');
  }

  public buscarTodosCatTelefones() {
    return this.http.get<CategoriaTelefone[]>('api/CategoriaTelefone/buscartodos');
  }

  public buscarTodosVinculos() {
    return this.http.get<Vinculo[]>('api/Vinculo/buscartodos');
  }

  async BuscarPorFiltro(Filtros: any) {
    return new Promise(resolve => {
      const json = JSON.stringify(Filtros);
      this.http.post('api/Pessoa/buscarPorFiltro', json).subscribe(result => {
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
        console.log(error);
        resolve(resultado);
      });
    })
  }

  async BuscarCidadePorFiltro(Filtros: any) {
    return new Promise(resolve => {
      const json = JSON.stringify(Filtros);
      this.http.post('api/Cidade/buscarPorFiltro', json).subscribe(result => {
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

  async BuscarEstadoPorFiltro(Filtros: any) {
    return new Promise(resolve => {
      const json = JSON.stringify(Filtros);
      this.http.post('api/Estado/buscarPorFiltro', json).subscribe(result => {
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


  async BuscarCidadePorId(Codigo: String) {
    return new Promise(resolve => {
      if (!Codigo) {
        resolve("Codigo Indefinido");
      } else {
        this.http.get('api/Cidade/buscarPorId/' + Codigo).subscribe(result => {
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
      }

    })
  }

  async BuscarPorId(Codigo: String) {
    return new Promise(resolve => {
      if (!Codigo) {
        resolve("Codigo Indefinido");
      } else {
        this.http.get('api/Pessoa/buscarPorId/' + Codigo).subscribe(result => {
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
      }

    })
  }

  async BuscarEstadoPorId(Codigo: String) {
    return new Promise(resolve => {
      if (!Codigo) {
        resolve("Codigo Indefinido");
      } else {
        this.http.get('api/Estado/buscarPorId/' + Codigo).subscribe(result => {
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
      }

    })

  }
}

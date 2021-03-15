import { PerfilUsuario } from './../../class/perfil-usuario';
import { Component, OnInit } from '@angular/core';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-perfil-usuario',
  templateUrl: './cadastro-perfil-usuario.component.html',
  styleUrls: ['./cadastro-perfil-usuario.component.css']
})
export class CadastroPerfilUsuarioComponent implements OnInit {

  public PerfisUsuario: PerfilUsuario[] = [];
  public perfilUsuario: PerfilUsuario = new PerfilUsuario();
  constructor( private PerfilUsuarioService: PerfilUsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar(){
    this.PerfilUsuarioService.buscarTodos().subscribe( result => {
      this.PerfisUsuario = result;
  });
    }
  public async Gravar(){
    try{
      await this.PerfilUsuarioService.gravar(this.perfilUsuario);
      this.listar();
      this.perfilUsuario = new PerfilUsuario();
      }catch (error){
        console.error(error);
      }
  }

  public selecionarPerfil(perfilUsuario: PerfilUsuario) {
    if ( perfilUsuario ) {
      this.perfilUsuario = perfilUsuario;
    }
  }

  public Limpar() {
      this.perfilUsuario = new PerfilUsuario();
  }

}

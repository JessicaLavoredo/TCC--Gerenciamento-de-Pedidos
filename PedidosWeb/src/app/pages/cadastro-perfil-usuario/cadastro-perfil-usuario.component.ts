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

  constructor( private ListaPrecoService: PerfilUsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.ListaPrecoService.buscarTodos().subscribe( result => {
              this.PerfisUsuario = result;
     });
  }

}

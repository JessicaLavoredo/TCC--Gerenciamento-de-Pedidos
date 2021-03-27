import { PerfilUsuario } from './../../class/perfil-usuario';
import { UsuarioService } from './../../services/usuario.service';
import { PerfilUsuarioService } from './../../services/perfil-usuario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/class/usuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChild('modalSearch') modalSearch: ElementRef;
  public paginaAtual = 1;
  botao: boolean = false;
  public Usuario: Usuario = new Usuario();
  ConfirmacaoSenha: string = '';
  Perfis: PerfilUsuario[] = [];
  Perfil: PerfilUsuario = new PerfilUsuario();

  constructor(private UsuarioService: UsuarioService, private router: Router, private PerfilUsuarioService: PerfilUsuarioService) { }

  ngOnInit(): void {
    this.listarPerfil()
  }

  public listarPerfil() {
    this.PerfilUsuarioService.buscarTodos().subscribe(result => {
      this.Perfis = result;
    });
  }

  Pesquisar() {
    this.modalSearch.nativeElement.click();
  }

  handlePageChange(event) {
    this.paginaAtual = event;
  }

  public async Gravar() {
    try {
      let retorno = await this.UsuarioService.gravar(this.Usuario)
      alert(retorno.data)
      this.Limpar();

    } catch (error) {
      console.error(error);
    }
  }
  Limpar() {
    this.Usuario = new Usuario();
  }
}

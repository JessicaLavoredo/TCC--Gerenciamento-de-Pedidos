import { PerfilUsuario } from './../../class/perfil-usuario';
import { Component, OnInit } from '@angular/core';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-cadastro-perfil-usuario',
  templateUrl: './cadastro-perfil-usuario.component.html',
  styleUrls: ['./cadastro-perfil-usuario.component.css']
})
export class CadastroPerfilUsuarioComponent implements OnInit {

  public PerfisUsuario: PerfilUsuario[] = [];
  public perfilUsuario: PerfilUsuario = new PerfilUsuario();
  constructor(private PerfilUsuarioService: PerfilUsuarioService, private router: Router, private AlertService: AlertService) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.PerfilUsuarioService.buscarTodos().subscribe(result => {
      this.PerfisUsuario = result;
    });
  }
  public async Gravar() {
    try {
      let retorno: any = await this.PerfilUsuarioService.gravar(this.perfilUsuario);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.perfilUsuario = new PerfilUsuario();
    } catch (error) {
      console.error(error);
    }
  }

  public selecionarPerfil(perfilUsuario: PerfilUsuario) {
    if (perfilUsuario) {
      this.perfilUsuario = perfilUsuario;
    }
  }

  public Limpar() {
    this.perfilUsuario = new PerfilUsuario();
  }

  public async Excluir() {
    try {
      let retorno: any = await this.PerfilUsuarioService.excluir(this.perfilUsuario);
      if (retorno.status == 200) {
        this.AlertService.show(retorno.resultado, { classname: 'bg-success text-light', delay: 3000 });
      } else {
        this.AlertService.show(retorno.resultado, { classname: 'bg-danger text-light', delay: 3000 });
      }
      this.listar();
      this.perfilUsuario = new PerfilUsuario();
    } catch (error) {
      console.error(error);
    }
  }
}

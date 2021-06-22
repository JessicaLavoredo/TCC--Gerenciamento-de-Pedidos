import { UsuarioLogin } from './../../class/usuariologin';
import { AlertService } from './../../services/alert.service';
import { Usuario } from '../../class/usuario';
import { Router } from '@angular/router';
import { AccountService } from './../../services/account.service';
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: UsuarioLogin = new UsuarioLogin();


  constructor(private accountService: AccountService, private router: Router, private AlertService: AlertService) { }


  ngOnInit(): void {
  }


  onSubmit() {
    try {
      if (this.usuario.Login == '') {
        this.AlertService.show('Preencha corretamente o campo: Usuário', { classname: 'bg-danger text-light', delay: 3000 });
      } else if (this.usuario.Senha == '') {
        this.AlertService.show('Preencha corretamente o campo: Senha', { classname: 'bg-danger text-light', delay: 3000 });
      } else {
        this.accountService.login(this.usuario).then((retorno: any) => {
          if (retorno.status == 200) {
            window.localStorage.setItem('token', retorno.resultado.Authorization);
            this.router.navigate(['']);
          } else {
            this.AlertService.show('Usuário ou Senha inválido', { classname: 'bg-danger text-light', delay: 3000 });
          }
        });

      }
    } catch (error) {
      this.AlertService.show('erro inesperado', { classname: 'bg-danger text-light', delay: 3000 });
    }
  }
}

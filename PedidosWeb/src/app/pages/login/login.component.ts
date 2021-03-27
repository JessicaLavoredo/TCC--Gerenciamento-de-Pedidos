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

  public usuario: Usuario = new Usuario();


  constructor(private accountService: AccountService, private router: Router) { }


  ngOnInit(): void {
  }

  // async onSubmit(){
  //     this.accountService.login(this.usuario).subscribe( result => {
  //         console.log(result);
  //         window.localStorage.setItem('token', result.idPessoa);
  //         this.router.navigate(['']);
  //     });
  //   }

  async onSubmit() {
    try {
      await this.accountService.login(this.usuario);
      alert('logou');
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }
}

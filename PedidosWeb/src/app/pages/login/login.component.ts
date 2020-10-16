import { Router } from '@angular/router';
import { AccountService } from './../../services/account.service';
import { Component, OnInit, NgModule } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    email: '',
    Password: ''
  };

  constructor( private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try {
      const result = await this.accountService.login(this.login);
      console.log('login efetuado: ${result}');
      this.router.navigate(['']);
    }catch (error){
      console.error(error);
    }
  }

}

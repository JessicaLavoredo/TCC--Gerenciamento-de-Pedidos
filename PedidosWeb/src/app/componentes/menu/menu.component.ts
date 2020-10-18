import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  constructor( private accountService: AccountService, private router: Router) { }
  public sair(){
    try{
      window.localStorage.removeItem('token');
      console.log ('saiu');
      this.router.navigate(['login']);
      }catch (error){
        console.error(error);
      }
  }

}

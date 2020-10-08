import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  login(user: any){
  return new Promise((resolve) => {
  window.localStorage.setItem('token', 'meu-token');
  resolve(true);
    });
  }

}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaEmail } from '../categoria-email';

@Injectable({
  providedIn: 'root'
})
export class CategoriaemailService {
  constructor(private http: HttpClient) { }
  

}

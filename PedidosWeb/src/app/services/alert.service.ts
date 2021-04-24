import { Vinculo } from './../class/vinculo';
import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  constructor(private http: HttpClient) { }
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}

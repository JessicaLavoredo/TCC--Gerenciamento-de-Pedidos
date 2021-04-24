import { AlertService } from './../../services/alert.service';
import { Component, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  constructor(public AlertService: AlertService) { }

  ngOnInit(): void { }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}

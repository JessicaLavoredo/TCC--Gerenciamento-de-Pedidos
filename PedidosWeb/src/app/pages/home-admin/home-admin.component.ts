import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/class/pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  public Pedidos: Pedido[] = [];

  constructor( private PedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.PedidoService.buscarTodos().subscribe( result => {
              this.Pedidos = result;
     });
  }

}

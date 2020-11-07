import { Cliente } from './../../class/cliente';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  public Clientes: Cliente[] = [];
  public Cliente: Cliente = new Cliente;
  public isJuridico = false ;
  public labelNome = 'Nome' ;
  public labelFantasia = 'Apelido' ;
  public labelCPFCNPJ = 'CPF' ;
  public labelRGIE = 'RG' ;
  public cpfMask = '000.000.000-00';
  public rgMask = '00.000.000-0';
  public desativado = false ;
  constructor( private ClienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.ClienteService.buscarTodos().subscribe( result => {
              this.Clientes = result;
     });
    this.Cliente.tipo = 'F';
  }

  public alterartipo(){
    if (this.Cliente.tipo == 'F'){
      this.isJuridico = false;
      this.labelNome = 'Nome' ;
      this.labelFantasia = 'Apelido' ;
      this.labelCPFCNPJ = 'CPF' ;
      this.labelRGIE = 'RG' ;
      this.cpfMask = '000.000.000-00';
      this.rgMask = '00.000.000-0';
    }else{
      this.isJuridico = true;
      this.labelNome = 'Razão Social' ;
      this.labelFantasia = 'Nome Fantasia' ;
      this.labelCPFCNPJ = 'CNPJ' ;
      this.labelRGIE = 'Inscrição Estadual' ;
      this.rgMask = '9999999999-0';
      this.cpfMask = '00.000.000/0000-00';
    }
  }

}

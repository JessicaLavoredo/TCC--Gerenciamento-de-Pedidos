import { RelatorioFuncionarioComponent } from './pages/relatorio-funcionario/relatorio-funcionario.component';
import { PageLogadaComponent } from './pages/page-logada/page-logada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroFuncionarioComponent } from './pages/cadastro-funcionario/cadastro-funcionario.component';
import { CadastroCatEmailComponent } from './pages/cadastro-cat-email/cadastro-cat-email.component';
import { CadastroCatEnderecoComponent } from './pages/cadastro-cat-endereco/cadastro-cat-endereco.component';
import { CadastroCatTelefoneComponent } from './pages/cadastro-cat-telefone/cadastro-cat-telefone.component';
import { CadastroPerfilUsuarioComponent } from './pages/cadastro-perfil-usuario/cadastro-perfil-usuario.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { CadastroListaPrecoComponent } from './pages/cadastro-lista-preco/cadastro-lista-preco.component';
import { CadastroFormaPagamentoComponent } from './pages/cadastro-forma-pagamento/cadastro-forma-pagamento.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/account/auth.guard';
import { RelatorioClienteComponent } from './pages/relatorio-cliente/relatorio-cliente.component';
import { RelatorioPedidoComponent } from './pages/relatorio-pedido/relatorio-pedido.component';

const routes: Routes = [
  { path: '', component: PageLogadaComponent ,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent},
      { path: 'CadastroFuncionario', component: CadastroFuncionarioComponent },
      { path: 'CadastroCatEmail', component: CadastroCatEmailComponent },
      { path: 'CadastroCatEndereco', component: CadastroCatEnderecoComponent },
      { path: 'CadastroCatTelefone', component: CadastroCatTelefoneComponent },
      { path: 'CadastroPerfilUsuario', component: CadastroPerfilUsuarioComponent },
      { path: 'CadastroUsuario', component: CadastroUsuarioComponent },
      { path: 'CadastroProduto', component: CadastroProdutoComponent },
      { path: 'CadastroCliente', component: CadastroClienteComponent },
      { path: 'CadastroListaPreco', component: CadastroListaPrecoComponent },
      { path: 'CadastroFormaPagamento', component: CadastroFormaPagamentoComponent },
      { path: 'RelatorioFuncionario', component: RelatorioFuncionarioComponent },
      { path: 'RelatorioCliente', component: RelatorioClienteComponent },
      { path: 'RelatorioPedidos', component: RelatorioPedidoComponent },
      { path: 'HomeAdmin', component: HomeAdminComponent }
    ],
    // canActivate: [AuthGuard]
  },
  { path: '', component: AuthenticationComponent ,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
  ]
},


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

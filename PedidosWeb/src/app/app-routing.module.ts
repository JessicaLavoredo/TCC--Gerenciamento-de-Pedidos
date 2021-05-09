import { Pessoa } from 'src/app/class/Pessoa';
import { CadastroVinculoEmpresaComponent } from './pages/cadastro-vinculo-empresa/cadastro-vinculo-empresa.component';
import { CadastroPedidoComponent } from './pages/cadastro-pedido/cadastro-pedido.component';
import { RelatorioFuncionarioComponent } from './pages/relatorio-funcionario/relatorio-funcionario.component';
import { PageLogadaComponent } from './pages/page-logada/page-logada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';
import { CadastroCatEmailComponent } from './pages/cadastro-cat-email/cadastro-cat-email.component';
import { CadastroCatEnderecoComponent } from './pages/cadastro-cat-endereco/cadastro-cat-endereco.component';
import { CadastroCatTelefoneComponent } from './pages/cadastro-cat-telefone/cadastro-cat-telefone.component';
import { CadastroPerfilUsuarioComponent } from './pages/cadastro-perfil-usuario/cadastro-perfil-usuario.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroListaPrecoComponent } from './pages/cadastro-lista-preco/cadastro-lista-preco.component';
import { CadastroFormaPagamentoComponent } from './pages/cadastro-forma-pagamento/cadastro-forma-pagamento.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/account/auth.guard';
import { AuthGuardAdm } from './guard/account/authAdm.guard';
import { RelatorioClienteComponent } from './pages/relatorio-cliente/relatorio-cliente.component';
import { RelatorioPedidoComponent } from './pages/relatorio-pedido/relatorio-pedido.component';

const routes: Routes = [
  {
    path: '', component: PageLogadaComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'CadastroPessoa', component: CadastroPessoaComponent, canActivate: [AuthGuard] },
      { path: 'CadastroCatEmail', component: CadastroCatEmailComponent, canActivate: [AuthGuardAdm] },
      { path: 'CadastroCatEndereco', component: CadastroCatEnderecoComponent, canActivate: [AuthGuardAdm] },
      { path: 'CadastroCatTelefone', component: CadastroCatTelefoneComponent, canActivate: [AuthGuardAdm] },
      { path: 'CadastroPerfilUsuario', component: CadastroPerfilUsuarioComponent, canActivate: [AuthGuardAdm] },
      { path: 'CadastroUsuario', component: CadastroUsuarioComponent, canActivate: [AuthGuardAdm] },
      { path: 'CadastroProduto', component: CadastroProdutoComponent, canActivate: [AuthGuard] },
      { path: 'CadastroListaPreco', component: CadastroListaPrecoComponent, canActivate: [AuthGuard] },
      { path: 'CadastroFormaPagamento', component: CadastroFormaPagamentoComponent, canActivate: [AuthGuardAdm] },
      { path: 'RelatorioFuncionario', component: RelatorioFuncionarioComponent, canActivate: [AuthGuard] },
      { path: 'RelatorioCliente', component: RelatorioClienteComponent, canActivate: [AuthGuard] },
      { path: 'RelatorioPedidos', component: RelatorioPedidoComponent, canActivate: [AuthGuard] },
      { path: 'CadastroPedido', component: CadastroPedidoComponent, canActivate: [AuthGuard] },
      { path: 'VinculoEmpresa', component: CadastroVinculoEmpresaComponent, canActivate: [AuthGuardAdm] },
      { path: 'HomeAdmin', component: HomeAdminComponent, canActivate: [AuthGuard] }
    ],
  },
  {
    path: '', component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '', component: PageLogadaComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'CadastroPessoa', component: CadastroPessoaComponent },
      { path: 'CadastroCatEmail', component: CadastroCatEmailComponent },
      { path: 'CadastroCatEndereco', component: CadastroCatEnderecoComponent },
      { path: 'CadastroCatTelefone', component: CadastroCatTelefoneComponent },
      { path: 'CadastroPerfilUsuario', component: CadastroPerfilUsuarioComponent },
      { path: 'CadastroUsuario', component: CadastroUsuarioComponent },
      { path: 'CadastroProduto', component: CadastroProdutoComponent },
      { path: 'CadastroListaPreco', component: CadastroListaPrecoComponent },
      { path: 'CadastroFormaPagamento', component: CadastroFormaPagamentoComponent },
      { path: 'RelatorioFuncionario', component: RelatorioFuncionarioComponent },
      { path: 'RelatorioCliente', component: RelatorioClienteComponent },
      { path: 'RelatorioPedidos', component: RelatorioPedidoComponent },
      { path: 'CadastroPedido', component: CadastroPedidoComponent },
      { path: 'VinculoEmpresa', component: CadastroVinculoEmpresaComponent },
      { path: 'HomeAdmin', component: HomeAdminComponent }
    ],
    canActivate: [AuthGuard]
  }


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

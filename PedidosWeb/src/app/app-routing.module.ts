import { PageLogadaComponent } from './pages/page-logada/page-logada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroFuncionarioComponent } from './pages/cadastro-funcionario/cadastro-funcionario.component';
import { CadastroCatEmailComponent } from './pages/cadastro-cat-email/cadastro-cat-email.component';
import { CadastroCatEnderecoComponent } from './pages/cadastro-cat-endereco/cadastro-cat-endereco.component';
import { CadastroCatTelefoneComponent } from './pages/cadastro-cat-telefone/cadastro-cat-telefone.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/account/auth.guard';

const routes: Routes = [
  { path: '', component: PageLogadaComponent ,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent},
      { path: 'CadastroFuncionario', component: CadastroFuncionarioComponent },
      { path: 'CadastroCatEmail', component: CadastroCatEmailComponent },
      { path: 'CadastroCatEndereco', component: CadastroCatEnderecoComponent },
      { path: 'CadastroCatTelefone', component: CadastroCatTelefoneComponent },
 
    ],
    canActivate: [AuthGuard]
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

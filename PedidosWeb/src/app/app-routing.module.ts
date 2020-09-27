import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'CadastroFuncionario', component: CadastroFuncionarioComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

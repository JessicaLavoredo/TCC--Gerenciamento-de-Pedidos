import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CadastroFuncionarioComponent } from './pages/cadastro-funcionario/cadastro-funcionario.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { PageLogadaComponent } from './pages/page-logada/page-logada.component';
import { CadastroCatEmailComponent } from './pages/cadastro-cat-email/cadastro-cat-email.component';
import { CadastroCatEnderecoComponent } from './pages/cadastro-cat-endereco/cadastro-cat-endereco.component';
import { CadastroCatTelefoneComponent } from './pages/cadastro-cat-telefone/cadastro-cat-telefone.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    CadastroFuncionarioComponent,
    LoginComponent,
    AuthenticationComponent,
    PageLogadaComponent,
    CadastroCatEmailComponent,
    CadastroCatEnderecoComponent,
    CadastroCatTelefoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

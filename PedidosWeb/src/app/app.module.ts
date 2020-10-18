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
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { CadastroPerfilUsuarioComponent } from './pages/cadastro-perfil-usuario/cadastro-perfil-usuario.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { CadastroListaPrecoComponent } from './pages/cadastro-lista-preco/cadastro-lista-preco.component';
import { CadastroFormaPagamentoComponent } from './pages/cadastro-forma-pagamento/cadastro-forma-pagamento.component';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

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
    CadastroCatTelefoneComponent,
    HomeAdminComponent,
    CadastroPerfilUsuarioComponent,
    CadastroUsuarioComponent,
    CadastroProdutoComponent,
    CadastroListaPrecoComponent,
    CadastroFormaPagamentoComponent,
    CadastroClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

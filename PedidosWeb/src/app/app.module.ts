import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { RelatorioPedidoComponent } from './pages/relatorio-pedido/relatorio-pedido.component';
import { CadastroPedidoComponent } from './pages/cadastro-pedido/cadastro-pedido.component';
import { CadastroVinculoEmpresaComponent } from './pages/cadastro-vinculo-empresa/cadastro-vinculo-empresa.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlertComponent } from './componentes/alert/alert.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { httpInterceptorProviders } from './http-interceptors';
import { SomenteNumerosDirective } from './directives/somente-numeros.directive';
import { RelatorioPessoaComponent } from './pages/relatorio-pessoa/relatorio-pessoa.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    CadastroPessoaComponent,
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
    RelatorioPedidoComponent,
    CadastroPedidoComponent,
    CadastroVinculoEmpresaComponent,
    RecuperarSenhaComponent,
    AlertComponent,
    SomenteNumerosDirective,
    RelatorioPessoaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    Ng2SmartTableModule,
    Ng2SearchPipeModule,
    ModalModule,
    MatSelectModule,
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

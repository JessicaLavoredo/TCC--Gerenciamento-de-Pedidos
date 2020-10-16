import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPerfilUsuarioComponent } from './cadastro-perfil-usuario.component';

describe('CadastroPerfilUsuarioComponent', () => {
  let component: CadastroPerfilUsuarioComponent;
  let fixture: ComponentFixture<CadastroPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

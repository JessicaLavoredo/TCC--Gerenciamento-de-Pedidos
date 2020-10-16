import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroListaPrecoComponent } from './cadastro-lista-preco.component';

describe('CadastroListaPrecoComponent', () => {
  let component: CadastroListaPrecoComponent;
  let fixture: ComponentFixture<CadastroListaPrecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroListaPrecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroListaPrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFormaPagamentoComponent } from './cadastro-forma-pagamento.component';

describe('CadastroFormaPagamentoComponent', () => {
  let component: CadastroFormaPagamentoComponent;
  let fixture: ComponentFixture<CadastroFormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroFormaPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

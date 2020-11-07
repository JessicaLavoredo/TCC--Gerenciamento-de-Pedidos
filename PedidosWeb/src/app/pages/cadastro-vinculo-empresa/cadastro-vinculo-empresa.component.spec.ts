import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVinculoEmpresaComponent } from './cadastro-vinculo-empresa.component';

describe('CadastroVinculoEmpresaComponent', () => {
  let component: CadastroVinculoEmpresaComponent;
  let fixture: ComponentFixture<CadastroVinculoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroVinculoEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVinculoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

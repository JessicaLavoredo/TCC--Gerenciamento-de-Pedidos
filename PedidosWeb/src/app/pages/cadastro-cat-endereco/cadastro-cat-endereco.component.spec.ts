import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCatEnderecoComponent } from './cadastro-cat-endereco.component';

describe('CadastroCatEnderecoComponent', () => {
  let component: CadastroCatEnderecoComponent;
  let fixture: ComponentFixture<CadastroCatEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCatEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCatEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCatTelefoneComponent } from './cadastro-cat-telefone.component';

describe('CadastroCatTelefoneComponent', () => {
  let component: CadastroCatTelefoneComponent;
  let fixture: ComponentFixture<CadastroCatTelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCatTelefoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCatTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

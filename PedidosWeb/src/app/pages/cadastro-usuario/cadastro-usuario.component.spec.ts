import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastoUsuarioComponent } from './cadastro-usuario.component';

describe('CadastoUsuarioComponent', () => {
  let component: CadastoUsuarioComponent;
  let fixture: ComponentFixture<CadastoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCatEmailComponent } from './cadastro-cat-email.component';

describe('CadastroCatEmailComponent', () => {
  let component: CadastroCatEmailComponent;
  let fixture: ComponentFixture<CadastroCatEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCatEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCatEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

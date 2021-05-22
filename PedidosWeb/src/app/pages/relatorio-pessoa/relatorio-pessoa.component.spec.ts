import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPessoaComponent } from './relatorio-pessoa.component';

describe('RelatorioPessoaComponent', () => {
  let component: RelatorioPessoaComponent;
  let fixture: ComponentFixture<RelatorioPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

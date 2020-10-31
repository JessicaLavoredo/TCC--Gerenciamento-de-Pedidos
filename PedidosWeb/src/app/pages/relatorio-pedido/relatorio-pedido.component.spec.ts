import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPedidoComponent } from './relatorio-pedido.component';

describe('RelatorioPedidoComponent', () => {
  let component: RelatorioPedidoComponent;
  let fixture: ComponentFixture<RelatorioPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

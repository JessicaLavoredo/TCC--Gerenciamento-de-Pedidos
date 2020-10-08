import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogadaComponent } from './page-logada.component';

describe('PageLogadaComponent', () => {
  let component: PageLogadaComponent;
  let fixture: ComponentFixture<PageLogadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLogadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEntradaComponent } from './buscar-entrada.component';

describe('BuscarEntradaComponent', () => {
  let component: BuscarEntradaComponent;
  let fixture: ComponentFixture<BuscarEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarEntradaComponent]
    });
    fixture = TestBed.createComponent(BuscarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

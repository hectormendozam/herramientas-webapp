import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMateriaScreenComponent } from './tabla-materia-screen.component';

describe('TablaMateriaScreenComponent', () => {
  let component: TablaMateriaScreenComponent;
  let fixture: ComponentFixture<TablaMateriaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaMateriaScreenComponent]
    });
    fixture = TestBed.createComponent(TablaMateriaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

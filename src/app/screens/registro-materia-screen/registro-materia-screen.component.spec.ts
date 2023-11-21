import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMateriaScreenComponent } from './registro-materia-screen.component';

describe('RegistroMateriaScreenComponent', () => {
  let component: RegistroMateriaScreenComponent;
  let fixture: ComponentFixture<RegistroMateriaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroMateriaScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroMateriaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

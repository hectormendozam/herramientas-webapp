import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCitaModalComponent } from './eliminar-cita-modal.component';

describe('EliminarCitaModalComponent', () => {
  let component: EliminarCitaModalComponent;
  let fixture: ComponentFixture<EliminarCitaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarCitaModalComponent]
    });
    fixture = TestBed.createComponent(EliminarCitaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

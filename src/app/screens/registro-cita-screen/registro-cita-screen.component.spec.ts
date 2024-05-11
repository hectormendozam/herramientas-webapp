import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCitaScreenComponent } from './registro-cita-screen.component';

describe('RegistroCitaScreenComponent', () => {
  let component: RegistroCitaScreenComponent;
  let fixture: ComponentFixture<RegistroCitaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroCitaScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroCitaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroContactoEScreenComponent } from './registro-contacto-e-screen.component';

describe('RegistroContactoEScreenComponent', () => {
  let component: RegistroContactoEScreenComponent;
  let fixture: ComponentFixture<RegistroContactoEScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroContactoEScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroContactoEScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

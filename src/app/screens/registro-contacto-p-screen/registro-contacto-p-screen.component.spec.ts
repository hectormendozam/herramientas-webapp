import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroContactoPScreenComponent } from './registro-contacto-p-screen.component';

describe('RegistroContactoPScreenComponent', () => {
  let component: RegistroContactoPScreenComponent;
  let fixture: ComponentFixture<RegistroContactoPScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroContactoPScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroContactoPScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIngeScreenComponent } from './registro-inge-screen.component';

describe('RegistroIngeScreenComponent', () => {
  let component: RegistroIngeScreenComponent;
  let fixture: ComponentFixture<RegistroIngeScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroIngeScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroIngeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

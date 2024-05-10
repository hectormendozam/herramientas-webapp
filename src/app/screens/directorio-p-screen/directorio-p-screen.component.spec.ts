import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioPScreenComponent } from './directorio-p-screen.component';

describe('DirectorioPScreenComponent', () => {
  let component: DirectorioPScreenComponent;
  let fixture: ComponentFixture<DirectorioPScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorioPScreenComponent]
    });
    fixture = TestBed.createComponent(DirectorioPScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

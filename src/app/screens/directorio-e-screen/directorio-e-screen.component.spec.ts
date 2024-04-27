import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioEScreenComponent } from './directorio-e-screen.component';

describe('DirectorioEScreenComponent', () => {
  let component: DirectorioEScreenComponent;
  let fixture: ComponentFixture<DirectorioEScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorioEScreenComponent]
    });
    fixture = TestBed.createComponent(DirectorioEScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

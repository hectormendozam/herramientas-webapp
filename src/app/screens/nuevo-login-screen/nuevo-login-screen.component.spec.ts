import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoLoginScreenComponent } from './nuevo-login-screen.component';

describe('NuevoLoginScreenComponent', () => {
  let component: NuevoLoginScreenComponent;
  let fixture: ComponentFixture<NuevoLoginScreenComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoLoginScreenComponent ]
    })
    .compileComponents();
  });

    beforeEach(() => {
      fixture = TestBed.createComponent(NuevoLoginScreenComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

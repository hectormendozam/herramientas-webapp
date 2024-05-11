import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaScreenComponent } from './agenda-screen.component';

describe('AgendaScreenComponent', () => {
  let component: AgendaScreenComponent;
  let fixture: ComponentFixture<AgendaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaScreenComponent]
    });
    fixture = TestBed.createComponent(AgendaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

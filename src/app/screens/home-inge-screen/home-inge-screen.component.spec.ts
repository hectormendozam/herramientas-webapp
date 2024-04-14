import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIngeScreenComponent } from './home-inge-screen.component';

describe('HomeIngeScreenComponent', () => {
  let component: HomeIngeScreenComponent;
  let fixture: ComponentFixture<HomeIngeScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeIngeScreenComponent]
    });
    fixture = TestBed.createComponent(HomeIngeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

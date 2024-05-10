import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarContactopModalComponent } from './eliminar-contactop-modal.component';

describe('EliminarContactopModalComponent', () => {
  let component: EliminarContactopModalComponent;
  let fixture: ComponentFixture<EliminarContactopModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarContactopModalComponent]
    });
    fixture = TestBed.createComponent(EliminarContactopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

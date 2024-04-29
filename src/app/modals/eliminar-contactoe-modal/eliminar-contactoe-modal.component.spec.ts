import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarContactoeModalComponent } from './eliminar-contactoe-modal.component';

describe('EliminarContactoeModalComponent', () => {
  let component: EliminarContactoeModalComponent;
  let fixture: ComponentFixture<EliminarContactoeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarContactoeModalComponent]
    });
    fixture = TestBed.createComponent(EliminarContactoeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

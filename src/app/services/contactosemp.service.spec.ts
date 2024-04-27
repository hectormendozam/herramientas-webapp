import { TestBed } from '@angular/core/testing';

import { ContactosempService } from './contactosemp.service';

describe('ContactosempService', () => {
  let service: ContactosempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactosempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

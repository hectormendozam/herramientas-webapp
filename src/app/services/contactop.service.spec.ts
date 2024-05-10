import { TestBed } from '@angular/core/testing';

import { ContactopService } from './contactop.service';

describe('ContactopService', () => {
  let service: ContactopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

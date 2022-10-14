import { TestBed } from '@angular/core/testing';

import { DriversListService } from './drivers-list.service';

describe('DriversListService', () => {
  let service: DriversListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriversListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

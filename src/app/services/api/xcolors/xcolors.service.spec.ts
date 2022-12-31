import { TestBed } from '@angular/core/testing';

import { XcolorsService } from './xcolors.service';

describe('XcolorsService', () => {
  let service: XcolorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XcolorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

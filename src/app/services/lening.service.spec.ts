import { TestBed, inject } from '@angular/core/testing';

import { LeningService } from './lening.service';

describe('LeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeningService]
    });
  });

  it('should be created', inject([LeningService], (service: LeningService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { AfhandelenLeningService } from './afhandelen-lening.service';

describe('AfhandelenLeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfhandelenLeningService]
    });
  });

  it('should be created', inject([AfhandelenLeningService], (service: AfhandelenLeningService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { myService } from './data.service';

describe('myService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [myService]
    });
  });

  it('should be created', inject([myService], (service: myService) => {
    expect(service).toBeTruthy();
  }));
});

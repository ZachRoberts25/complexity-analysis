import { TestBed, inject } from '@angular/core/testing';

import { ComplexityService } from './service/complexity.service';

describe('ComplexityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplexityService]
    });
  });

  it('should be created', inject([ComplexityService], (service: ComplexityService) => {
    expect(service).toBeTruthy();
  }));
});

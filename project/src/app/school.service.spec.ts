import { TestBed } from '@angular/core/testing';

import { SchoolOfService } from './school.service';

describe('SchoolOfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolOfService = TestBed.get(SchoolOfService);
    expect(service).toBeTruthy();
  });
});

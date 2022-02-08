import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    //service = TestBed.inject(ContactService);
    service = TestBed.apply(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

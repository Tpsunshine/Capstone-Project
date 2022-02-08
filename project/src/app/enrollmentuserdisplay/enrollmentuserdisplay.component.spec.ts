import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentUserDisplayComponent } from './enrollmentuserdisplay.component';

describe('EnrollmentUserDisplayComponent', () => {
  let component: EnrollmentUserDisplayComponent;
  let fixture: ComponentFixture<EnrollmentUserDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentUserDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentUserDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDisplayComponent } from './coursedisplay.component';

describe('CourseDisplayComponent', () => {
  let component: CourseDisplayComponent;
  let fixture: ComponentFixture<CourseDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

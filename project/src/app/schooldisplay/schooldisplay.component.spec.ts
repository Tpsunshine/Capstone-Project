import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDisplayComponent } from './schooldisplay.component';

describe('SchoolDisplayComponent', () => {
  let component: SchoolDisplayComponent;
  let fixture: ComponentFixture<SchoolDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersideComponent } from './serverside.component';

describe('ServersideComponent', () => {
  let component: ServersideComponent;
  let fixture: ComponentFixture<ServersideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

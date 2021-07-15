import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedPatientsComponent } from './expected-patients.component';

describe('ExpectedPatientsComponent', () => {
  let component: ExpectedPatientsComponent;
  let fixture: ComponentFixture<ExpectedPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectedPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

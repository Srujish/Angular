import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDispensationSummary } from './sample-report.component';

describe('PatientDispensationSummary', () => {
  let component: PatientDispensationSummary;
  let fixture: ComponentFixture<PatientDispensationSummary>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDispensationSummary ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDispensationSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

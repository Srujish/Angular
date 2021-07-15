import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStatusLabReportComponent } from './patient-status-lab-report.component';

describe('PatientStatusLabReportComponent', () => {
  let component: PatientStatusLabReportComponent;
  let fixture: ComponentFixture<PatientStatusLabReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientStatusLabReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStatusLabReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

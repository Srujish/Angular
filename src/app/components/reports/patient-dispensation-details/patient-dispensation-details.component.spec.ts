import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDispensationDetailsComponent } from './patient-dispensation-details.component';

describe('PatientDispensationDetailsComponent', () => {
  let component: PatientDispensationDetailsComponent;
  let fixture: ComponentFixture<PatientDispensationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDispensationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDispensationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStatusDispensionComponent } from './patient-status-dispension.component';

describe('PatientStatusDispensionComponent', () => {
  let component: PatientStatusDispensionComponent;
  let fixture: ComponentFixture<PatientStatusDispensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientStatusDispensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStatusDispensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

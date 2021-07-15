import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimenSummaryFacilityComponent } from './regimen-summary-facility.component';

describe('RegimenSummaryFacilityComponent', () => {
  let component: RegimenSummaryFacilityComponent;
  let fixture: ComponentFixture<RegimenSummaryFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegimenSummaryFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegimenSummaryFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

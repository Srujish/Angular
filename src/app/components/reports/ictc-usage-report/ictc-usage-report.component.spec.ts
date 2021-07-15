import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IctcUsageReportComponent } from './ictc-usage-report.component';

describe('IctcUsageReportComponent', () => {
  let component: IctcUsageReportComponent;
  let fixture: ComponentFixture<IctcUsageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IctcUsageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IctcUsageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

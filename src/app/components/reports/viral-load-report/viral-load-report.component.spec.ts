import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViralLoadReportComponent } from './viral-load-report.component';

describe('ViralLoadReportComponent', () => {
  let component: ViralLoadReportComponent;
  let fixture: ComponentFixture<ViralLoadReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViralLoadReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViralLoadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

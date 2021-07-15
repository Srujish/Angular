import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatitentStatusSummaryComponent } from './patitent-status-summary.component';

describe('PatitentStatusSummaryComponent', () => {
  let component: PatitentStatusSummaryComponent;
  let fixture: ComponentFixture<PatitentStatusSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatitentStatusSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatitentStatusSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

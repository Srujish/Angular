import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimenSummaryStateComponent } from './regimen-summary-state.component';

describe('RegimenSummaryStateComponent', () => {
  let component: RegimenSummaryStateComponent;
  let fixture: ComponentFixture<RegimenSummaryStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegimenSummaryStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegimenSummaryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

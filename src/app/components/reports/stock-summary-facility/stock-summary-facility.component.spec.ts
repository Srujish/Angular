import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSummaryFacilityComponent } from './stock-summary-facility.component';

describe('StockSummaryFacilityComponent', () => {
  let component: StockSummaryFacilityComponent;
  let fixture: ComponentFixture<StockSummaryFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockSummaryFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSummaryFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

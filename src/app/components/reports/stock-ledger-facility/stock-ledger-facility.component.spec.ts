import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLedgerFacilityComponent } from './stock-ledger-facility.component';

describe('StockLedgerFacilityComponent', () => {
  let component: StockLedgerFacilityComponent;
  let fixture: ComponentFixture<StockLedgerFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockLedgerFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLedgerFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

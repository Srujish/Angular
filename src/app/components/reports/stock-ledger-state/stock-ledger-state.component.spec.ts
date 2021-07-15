import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLedgerStateComponent } from './stock-ledger-state.component';

describe('StockLedgerStateComponent', () => {
  let component: StockLedgerStateComponent;
  let fixture: ComponentFixture<StockLedgerStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockLedgerStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLedgerStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsNOAStatusComponent } from './contracts-noa-status.component';

describe('ContractsNOAStatusComponent', () => {
  let component: ContractsNOAStatusComponent;
  let fixture: ComponentFixture<ContractsNOAStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsNOAStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsNOAStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDosageComponent } from './daily-dosage.component';

describe('DailyDosageComponent', () => {
  let component: DailyDosageComponent;
  let fixture: ComponentFixture<DailyDosageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDosageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDosageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLevelPerfomanceComponent } from './state-level-perfomance.component';

describe('StateLevelPerfomanceComponent', () => {
  let component: StateLevelPerfomanceComponent;
  let fixture: ComponentFixture<StateLevelPerfomanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateLevelPerfomanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateLevelPerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NacoLevelPerfomanceComponent } from './naco-level-perfomance.component';

describe('NacoLevelPerfomanceComponent', () => {
  let component: NacoLevelPerfomanceComponent;
  let fixture: ComponentFixture<NacoLevelPerfomanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NacoLevelPerfomanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NacoLevelPerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

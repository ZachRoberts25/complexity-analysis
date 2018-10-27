import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComplexityByPeriodComponent } from './project-complexity-by-period.component';

describe('ProjectComplexityByPeriodComponent', () => {
  let component: ProjectComplexityByPeriodComponent;
  let fixture: ComponentFixture<ProjectComplexityByPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComplexityByPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComplexityByPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

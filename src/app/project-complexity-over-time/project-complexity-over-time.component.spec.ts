import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComplexityOverTimeComponent } from './project-complexity-over-time.component';

describe('ProjectComplexityOverTimeComponent', () => {
  let component: ProjectComplexityOverTimeComponent;
  let fixture: ComponentFixture<ProjectComplexityOverTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComplexityOverTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComplexityOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

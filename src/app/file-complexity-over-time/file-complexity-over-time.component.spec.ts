import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileComplexityOverTimeComponent } from './file-complexity-over-time.component';

describe('FileComplexityOverTimeComponent', () => {
  let component: FileComplexityOverTimeComponent;
  let fixture: ComponentFixture<FileComplexityOverTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileComplexityOverTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileComplexityOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

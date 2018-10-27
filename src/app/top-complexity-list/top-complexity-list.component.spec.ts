import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopComplexityListComponent } from './top-complexity-list.component';

describe('TopComplexityListComponent', () => {
  let component: TopComplexityListComponent;
  let fixture: ComponentFixture<TopComplexityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopComplexityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopComplexityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

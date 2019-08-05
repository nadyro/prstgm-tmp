import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTeamComponent } from './find-team.component';

describe('FindTeamComponent', () => {
  let component: FindTeamComponent;
  let fixture: ComponentFixture<FindTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

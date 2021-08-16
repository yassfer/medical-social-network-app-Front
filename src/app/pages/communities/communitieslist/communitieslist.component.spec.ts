import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitieslistComponent } from './communitieslist.component';

describe('CommunitieslistComponent', () => {
  let component: CommunitieslistComponent;
  let fixture: ComponentFixture<CommunitieslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitieslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

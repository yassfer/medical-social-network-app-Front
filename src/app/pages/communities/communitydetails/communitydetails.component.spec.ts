import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitydetailsComponent } from './communitydetails.component';

describe('CommunitydetailsComponent', () => {
  let component: CommunitydetailsComponent;
  let fixture: ComponentFixture<CommunitydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

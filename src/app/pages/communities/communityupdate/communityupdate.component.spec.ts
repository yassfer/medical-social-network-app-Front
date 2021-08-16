import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityupdateComponent } from './communityupdate.component';

describe('CommunityupdateComponent', () => {
  let component: CommunityupdateComponent;
  let fixture: ComponentFixture<CommunityupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

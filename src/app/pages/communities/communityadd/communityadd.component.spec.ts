import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityaddComponent } from './communityadd.component';

describe('CommunityaddComponent', () => {
  let component: CommunityaddComponent;
  let fixture: ComponentFixture<CommunityaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

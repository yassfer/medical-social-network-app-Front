import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMyChallengeComponent } from './check-my-challenge.component';

describe('CheckMyChallengeComponent', () => {
  let component: CheckMyChallengeComponent;
  let fixture: ComponentFixture<CheckMyChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMyChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMyChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

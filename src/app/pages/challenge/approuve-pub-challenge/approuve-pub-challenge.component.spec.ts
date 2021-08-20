import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprouvePubChallengeComponent } from './approuve-pub-challenge.component';

describe('ApprouvePubChallengeComponent', () => {
  let component: ApprouvePubChallengeComponent;
  let fixture: ComponentFixture<ApprouvePubChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprouvePubChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprouvePubChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

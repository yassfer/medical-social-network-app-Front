import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallengeImageComponent } from './create-challenge-image.component';

describe('CreateChallengeImageComponent', () => {
  let component: CreateChallengeImageComponent;
  let fixture: ComponentFixture<CreateChallengeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChallengeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChallengeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

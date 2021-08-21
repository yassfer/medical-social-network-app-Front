import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutBotComponent } from './workout-bot.component';

describe('WorkoutBotComponent', () => {
  let component: WorkoutBotComponent;
  let fixture: ComponentFixture<WorkoutBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutBotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

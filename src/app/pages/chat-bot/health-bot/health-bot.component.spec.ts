import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthBotComponent } from './health-bot.component';

describe('HealthBotComponent', () => {
  let component: HealthBotComponent;
  let fixture: ComponentFixture<HealthBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthBotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

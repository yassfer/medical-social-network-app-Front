import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommunityImageComponent } from './create-community-image.component';

describe('CreateCommunityImageComponent', () => {
  let component: CreateCommunityImageComponent;
  let fixture: ComponentFixture<CreateCommunityImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommunityImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommunityImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingCarouselCardsComponent } from './landing-carousel-cards.component';

describe('LandingCarouselCardsComponent', () => {
  let component: LandingCarouselCardsComponent;
  let fixture: ComponentFixture<LandingCarouselCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCarouselCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingCarouselCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

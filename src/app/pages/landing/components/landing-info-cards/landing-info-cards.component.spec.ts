import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingInfoCardsComponent } from './landing-info-cards.component';

describe('LandingInfoCardsComponent', () => {
  let component: LandingInfoCardsComponent;
  let fixture: ComponentFixture<LandingInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingInfoCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

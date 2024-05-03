import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingCarouselCardsComponent } from './components/landing-carousel-cards/landing-carousel-cards.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';
import { LandingInfoCardsComponent } from './components/landing-info-cards/landing-info-cards.component';
import { LandingTabPanelComponent } from './components/landing-tab-panel/landing-tab-panel.component';
import { LandingTitleAndImageComponent } from './components/landing-title-and-image/landing-title-and-image.component';

@Component({
  template: `
    <!-- TODO: FIX KEYCLOAK-ANGULAR IMPORT ERROR -->
    <div class="container">
      <app-landing-title-and-image />
      <app-landing-carousel-cards />
      <app-landing-tab-panel />
      <app-landing-info-cards />
      <app-landing-footer />
    </div>
  `,
  standalone: true,
  imports: [
    // LandingHeaderComponent,
    LandingTitleAndImageComponent,
    LandingCarouselCardsComponent,
    LandingTabPanelComponent,
    LandingInfoCardsComponent,
    LandingFooterComponent,
  ],
})
class TestComponent {}

describe('LandingComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    const compiled = fixture.nativeElement;
    const expectedElements = [
      'app-landing-title-and-image',
      'app-landing-carousel-cards',
      'app-landing-tab-panel',
      'app-landing-info-cards',
      'app-landing-footer',
    ];
    expectedElements.forEach((element) =>
      expect(compiled.querySelector(element)).toBeTruthy()
    );
  });
});

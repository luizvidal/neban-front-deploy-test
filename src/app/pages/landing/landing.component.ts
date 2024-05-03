import { Component } from '@angular/core';
import { LandingCarouselCardsComponent } from './components/landing-carousel-cards/landing-carousel-cards.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { LandingInfoCardsComponent } from './components/landing-info-cards/landing-info-cards.component';
import { LandingTabPanelComponent } from './components/landing-tab-panel/landing-tab-panel.component';
import { LandingTitleAndImageComponent } from './components/landing-title-and-image/landing-title-and-image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingHeaderComponent,
    LandingTitleAndImageComponent,
    LandingCarouselCardsComponent,
    LandingTabPanelComponent,
    LandingInfoCardsComponent,
    LandingFooterComponent,
  ],
  template: `
    <app-landing-header />
    <div class="container">
      <app-landing-title-and-image />
      <app-landing-carousel-cards />
      <app-landing-tab-panel />
      <app-landing-info-cards />
      <app-landing-footer />
    </div>
  `,
  styles: `
    .container {
      height: calc(100vh - 70px);
      overflow: scroll;
      overflow-x: hidden;
    }
  `,
})
export default class LandingComponent {}

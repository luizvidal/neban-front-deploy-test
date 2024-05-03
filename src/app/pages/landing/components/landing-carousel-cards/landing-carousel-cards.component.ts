import { Component } from '@angular/core';
import { ResponsiveComponent } from '@common/components/responsive/responsive.component';
import { TranslatedDataInterface } from '@common/translation/interfaces/translated-data.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';

@Component({
  selector: 'app-landing-carousel-cards',
  standalone: true,
  imports: [CarouselModule, TranslateModule],
  templateUrl: './landing-carousel-cards.component.html',
  styles: `
    :host ::ng-deep {
      button.p-ripple.p-element.p-carousel-prev.p-link,
      button.p-ripple.p-element.p-carousel-next.p-link {
        color: var(--primary-color);
      }
    }
  `,
})
export class LandingCarouselCardsComponent extends ResponsiveComponent {
  icons = [
    'pi pi-comments',
    'pi pi-money-bill',
    'pi pi-google',
    'pi pi-wallet',
    'pi pi-truck',
    'pi pi-heart-fill',
  ];

  cards: TranslatedDataInterface[] = [];

  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '1980px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '1200px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.setTranslation();
  }

  setTranslation() {
    this.loadTranslation('LANDING.CAROUSEL_CARDS.CARDS').subscribe(
      (translation) => {
        this.cards = translation.map((card: any, index: number) => ({
          ICON: this.icons[index],
          ...card,
        }));
      }
    );
  }
}

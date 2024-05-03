import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ResponsiveComponent } from '@common/components/responsive/responsive.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-info-cards',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './landing-info-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingInfoCardsComponent extends ResponsiveComponent {
  icons = ['pi pi-percentage', 'pi pi-lock', 'pi pi-thumbs-up-fill'];

  cards = signal<any[]>([]);

  ngOnInit(): void {
    this.setTranslation();
  }

  setTranslation() {
    this.loadTranslation('LANDING.INFO_CARDS.CARDS').subscribe(
      (translation) => {
        translation.forEach((card: any, index: number) => {
          card.ICON = this.icons[index];
        });
        this.cards.set(translation);
      }
    );
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LanguageInterface } from '@common/translation/interfaces/language.interface';
import { TranslationService } from '@common/translation/translation.service';
import { ButtonComponent } from '@components/button/button.component';
import { ImgComponent } from '@components/img/img.component';
import { LinkComponent } from '@components/link/link.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-change-language-button',
  standalone: true,
  imports: [ButtonComponent, ImgComponent, OverlayPanelModule, LinkComponent],
  templateUrl: './change-language-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLanguageButtonComponent {
  translationService = inject(TranslationService);

  currentLanguge = this.translationService.currentLanguage$.value;

  currentLangugeImg = signal('countries-currency/brl.svg');

  languages: LanguageInterface[] = [
    {
      src: 'countries-currency/brl.svg',
      label: 'Português',
      code: 'pt-BR',
    },
    {
      src: 'countries-currency/ars.svg',
      label: 'Espanhol',
      code: 'es-AR',
    },
    {
      src: 'countries-currency/usd.svg',
      label: 'Inglês',
      code: 'en-US',
    },
  ];

  ngOnInit(): void {
    this.translationService.loadLanguage();
    const language = this.languages.find(
      (language) =>
        language.code == this.translationService.currentLanguage$.value
    );
    if (language) {
      this.currentLangugeImg.set(language.src);
    }
  }

  onSelectLanguage = (language: LanguageInterface) => {
    this.currentLangugeImg.set(language.src);
    this.translationService.changeLanguage(language.code);
  };
}

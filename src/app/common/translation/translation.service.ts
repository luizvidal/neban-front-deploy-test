import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageType } from './types/language.type';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  translateService = inject(TranslateService);

  currentLanguage$ = new BehaviorSubject<LanguageType>('pt-BR');

  changeLanguage(language: LanguageType) {
    this.currentLanguage$.next(language);
    localStorage.setItem('neban-language', language);
    this.translateService.use(language);
  }

  loadLanguage() {
    const language = localStorage.getItem('neban-language') as LanguageType;
    if (language) {
      this.changeLanguage(language);
    }
  }
}

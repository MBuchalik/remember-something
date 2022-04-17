import { Injectable } from '@angular/core';

import { PHRASES_DE } from '../models/language-phrases/de';
import { PHRASES_EN } from '../models/language-phrases/en';
import { Language, Phrases } from '../models/language.model';

const DEBUG_SESSION_STORAGE_KEY = 'debug-lang';

/**
 * For debugging purposes, you can set a language like so:
 *
 * ``` ts
 * window.sessionStorage.setItem('debug-lang', 'en');
 * ```
 *
 * (You have to reload the page after doing so.)
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: Language;
  private phrases: Phrases;

  constructor() {
    this.currentLanguage = this.getUserLanguage();

    if (this.currentLanguage === Language.German) {
      this.phrases = PHRASES_DE;
    } else {
      this.phrases = PHRASES_EN;
    }
  }

  /**
   * Get a phrase for the currently active language.
   *
   * @param phraseName The name of the phrase to retrieve.
   */
  getPhrase(phraseName: keyof Phrases): string {
    return this.phrases[phraseName]();
  }

  private getUserLanguage(): Language {
    const debugLanguage = this.getDebugLanguageIfSet();
    if (debugLanguage) {
      return debugLanguage;
    }

    if (navigator.language.startsWith('de')) {
      return Language.German;
    }

    return Language.English;
  }

  private getDebugLanguageIfSet(): Language | undefined {
    const debugEntry = window.sessionStorage.getItem(DEBUG_SESSION_STORAGE_KEY);

    if (debugEntry == null) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    if (!Object.values(Language).includes(debugEntry as any)) {
      return undefined;
    }

    return debugEntry as Language;
  }
}

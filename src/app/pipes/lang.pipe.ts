import { Pipe, PipeTransform } from '@angular/core';

import { Phrases } from '../models/language.model';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'lang',
})
export class LangPipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(value: keyof Phrases): string {
    return this.languageService.getPhrase(value);
  }
}

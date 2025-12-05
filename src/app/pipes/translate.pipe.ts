import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({ name: 'translate', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private t: TranslateService) {}
  transform(key: string): string {
    if (!key) return '';
    return this.t.translate(key);
  }
}

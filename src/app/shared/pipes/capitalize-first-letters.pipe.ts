import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetters',
  standalone: true,
})
export class CapitalizeFirstLettersPipe implements PipeTransform {
  transform(value: string): unknown {
    if (!value) return value;
    return value
      .split(' ')
      .map(
        (word: string) =>
          word[0].toUpperCase() + word.substring(1).toLowerCase()
      )
      .join(' ');
  }
}

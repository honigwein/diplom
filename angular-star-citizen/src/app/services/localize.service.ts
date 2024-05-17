import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {

  constructor() { }
  maxCharsError(maxChars: number): string {
    return `Максимальна кількість символів має не перевищувати ${maxChars}`;
  }
  noValidLinkError(): string {
    return 'Введіть коректне посилання';
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Input() value: string = '';
  @Input() placeholder: string = 'Пошук...';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value ?? '';
    this.valueChange.emit(inputValue);
  }
}

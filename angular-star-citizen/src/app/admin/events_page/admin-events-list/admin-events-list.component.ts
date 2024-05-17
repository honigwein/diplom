import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../../interfaces/event';

@Component({
  selector: 'app-admin-events-list',
  templateUrl: './admin-events-list.component.html',
  styleUrl: './admin-events-list.component.css'
})
export class AdminEventsListComponent {
  @Input() events: Event[] = [];
  @Output() eventClick: EventEmitter<string> = new EventEmitter<string>();

  onEventClick(eventId: string) {
    this.eventClick.emit(eventId);
  }
}
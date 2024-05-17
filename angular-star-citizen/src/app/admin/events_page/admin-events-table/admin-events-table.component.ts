import { Component, SimpleChanges } from '@angular/core';
import { AdminMenuComponent } from '../../admin-menu/admin-menu.component';
import { ApiService } from '../../../services/api.service';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
import { Event } from '../../../interfaces/event';
import { Role } from '../../../interfaces/role';

@Component({
  selector: 'app-admin-events-table',
  templateUrl: './admin-events-table.component.html',
  styleUrl: './admin-events-table.component.css'
})
export class AdminEventsTableComponent {
  events: Event[] = [];
  showAddEventForm: boolean = false;
  selectedEvent: Event | null = null;
  selectedRole: Role | null = null;

  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  fetchEvents() {
    this.apiService.request("admin/events/", "GET").subscribe((response: any) => {
      if (!response) {
        this.router.navigate(['/events']);
        return;
      }
      this.events = response;
      if (this.selectedEvent) {
        this.selectedEvent = this.events.find((event) => event.id === this.selectedEvent?.id) || null;
      }
    });
  }
  localDate(date: string) {
    const date_utc = new Date(date);
    const date_local = new Date(date_utc.getTime() + date_utc.getTimezoneOffset() * 60000);
    return new Date(date_local).toLocaleString();
  }
  handleEventClick(eventId: string) {
    this.selectedEvent = this.events.find((event) => event.id === eventId) || null;
    this.selectedRole = null;
  }
  handleRoleClick(roleId: string) {
    if (this.selectedEvent) {
      const role = this.selectedEvent.roles.find((role) => role.id === roleId);
      this.selectedRole = role || null;
    }
  }

  ngOnInit(): void {
    this.tokenExpirationCheck.startTokenRefreshCheck();
    this.fetchEvents();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
  toggleAddEventForm() {
    this.showAddEventForm = !this.showAddEventForm;
  }
  handleAddSuccess() {
    this.showAddEventForm = false;
    this.fetchEvents();
  }
  handleAddCancel() {
    this.showAddEventForm = false;
  }
  handleAction() {
    this.fetchEvents();
    this.selectedEvent = null;
    this.selectedRole = null;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { ApiService } from '../../services/api.service';
import { TokenExpirationCheck } from '../../services/token-expiration-check.service';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event';
import { MEDIA_URL } from '../../interfaces/config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css',
  providers: [DatePipe]
})
export class EventsPageComponent implements OnInit, OnDestroy {
  MEDIA_URL = MEDIA_URL;
  events: Event[] = [];
  appliedEvents: [string] = [""];
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  fetchData() {
    this.apiService.request("is_admin/", "GET").subscribe(
      (response) => {
        this.router.navigate(['/admin/events']);
      }
    );
    this.apiService.request("events/", "GET").subscribe(
      (response) => {
        this.events = response.all_events;
        this.appliedEvents = response.applied_events.map((event: any) => event.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  isEventStarted(event: Event) {
    const event_date_utc = new Date(event.datetime);
    const event_date_local = new Date(event_date_utc.getTime() + event_date_utc.getTimezoneOffset() * 60000);
    const now = new Date();
    return event_date_local >= now;
  }
  localDate(date: string) {
    const date_utc = new Date(date);
    const date_local = new Date(date_utc.getTime() + date_utc.getTimezoneOffset() * 60000);
    return new Date(date_local).toLocaleString();
  }
  handleAction() {
    this.fetchData();
  }

  isApplied(event: Event) {
    return this.appliedEvents.includes(event.id);
  }
  isRoleFull(event: Event, roleId: string) {
    const appliedRoles = event.application.filter(application => application.event_role === roleId);
    const role = event.roles.find(role => role.id === roleId);
    if (!role) {
      return false;
    }
    return appliedRoles.length >= role.max_users;
  }
  ngOnInit(): void {
    this.fetchData();
    this.tokenExpirationCheck.startTokenRefreshCheck();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
  }


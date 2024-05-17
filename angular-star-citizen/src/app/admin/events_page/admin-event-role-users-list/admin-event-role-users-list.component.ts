import { Component, Input, Output,EventEmitter, SimpleChanges } from '@angular/core';
import { Role } from '../../../interfaces/role';
import { User } from '../../../interfaces/user';
import { Event } from '../../../interfaces/event';
@Component({
  selector: 'app-admin-event-role-users-list',
  templateUrl: './admin-event-role-users-list.component.html',
  styleUrl: './admin-event-role-users-list.component.css'
})
export class AdminEventRoleUsersListComponent {
  users: User[] = [];
  @Input() event!: Event;
  @Input() role!: Role;
  @Output() confirm = new EventEmitter<User>();
  isUserConfirmed(user: User): boolean {
    return this.event.application.some((application) => application.user_id === user.id && application.is_conf);
  }
  isConfirmingDisabled(): boolean {
    const event_date_utc = new Date(this.event?.datetime || 0);
    const event_date_local = new Date(event_date_utc.getTime() + event_date_utc.getTimezoneOffset() * 60000);
    const now = new Date();
    return !(event_date_local >= now);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.event && this.role) {
      this.users = this.event.application
                .filter(application => application.event_role === this.role.id)
        .map(application => ({ id: application.user_id, username: application.user }));
    }
  }
  handleConfirm() {
    this.confirm.emit();
  }
}

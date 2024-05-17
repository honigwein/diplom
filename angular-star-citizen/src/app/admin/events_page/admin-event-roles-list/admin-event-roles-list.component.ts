import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Role } from '../../../interfaces/role';

@Component({
  selector: 'app-admin-event-roles-list',
  templateUrl: './admin-event-roles-list.component.html',
  styleUrl: './admin-event-roles-list.component.css'
})
export class AdminEventRolesListComponent {
  @Input() roles: Role[] = [];
  @Output() roleClick: EventEmitter<string> = new EventEmitter<string>();

  onRoleClick(roleId: string) {
    this.roleClick.emit(roleId);
  }
}

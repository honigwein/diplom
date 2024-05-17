import { Component } from '@angular/core';
import { AdminMenuComponent } from '../../admin-menu/admin-menu.component';
import { AddRoleFormComponent } from '../add-role-form/add-role-form.component';
import { ApiService } from '../../../services/api.service';
import { DeleteButtonComponent } from '../../../buttons/delete-button/delete-button.component';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
interface Role {
    id: string;
    name: string;
}
@Component({
  selector: 'app-admin-roles-table',
  templateUrl: './admin-roles-table.component.html',
  styleUrl: './admin-roles-table.component.css'
})
export class AdminRolesTableComponent {
  showAddRoleForm: boolean = false;
  roles: Role[] = [];
  tempRoleChanges: any = null;
  editedRoleId: string | null = null;
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.tokenExpirationCheck.startTokenRefreshCheck();
    this.fetchRoles();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
  fetchRoles() {
    this.apiService.request("admin/roles/", "GET").subscribe((response: any) => {
      if (!response) {
        this.router.navigate(['/events']);
        return;
      }
      this.roles = response;
    });
  }
  toggleAddRoleForm() {
    this.showAddRoleForm = !this.showAddRoleForm;
  }
  handleAddSuccess() {
    this.showAddRoleForm = false;
    this.fetchRoles();
  }
  handleAddCancel() {
    this.showAddRoleForm = false;
  }
  editRole(role: Role): void {
    this.tempRoleChanges = { ...role };
    this.editedRoleId = role.id.toString();
  }
  cancelEdit(): void {
    this.tempRoleChanges = null;
    this.editedRoleId = null;
  }
  confirmEdit(): void {
    this.tempRoleChanges = null;
    this.editedRoleId = null;
    this.fetchRoles();
  }
  handleAction(): void {
    this.fetchRoles();
  }
}

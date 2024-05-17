import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
import { Ship } from '../../../interfaces/ship';
interface User {
  id: string;
  username: string;
  ships: Ship[];
}
@Component({
  selector: 'app-users-ships-table',
  templateUrl: './users-ships-table.component.html',
  styleUrl: './users-ships-table.component.css'
})
export class UsersShipsTableComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  isAdmin: boolean = false;
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  fetchUsers() {
    this.apiService.request("is_admin/", "GET").subscribe(
      (response) => {
        this.isAdmin = true;
      },
      (error) => {
        this.isAdmin = false;
        }
      );
    this.apiService.request("admin/users/", "GET").subscribe((response: any) => {
      if (!response) {
        this.router.navigate(['/events']);
        return;
      }
      this.users = response;
      this.filteredUsers = response;
    });
  }
  filterData(searchTerm: string) {
    this.filteredUsers = this.users.map(user => {
    return {
      ...user,
      ships: user.ships.filter(ship => ship.name.toLowerCase().includes(searchTerm.toLowerCase()))
    };
  }).filter(user => user.ships.length > 0);
  }
  ngOnInit(): void {
    this.tokenExpirationCheck.startTokenRefreshCheck();
    this.fetchUsers();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
}

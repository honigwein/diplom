import { Component } from '@angular/core';
import { UserMenuComponent } from '../../user-menu/user-menu.component';
import { ApiService } from '../../../services/api.service';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-hangar',
  templateUrl: './user-hangar.component.html',
  styleUrl: './user-hangar.component.css'
})
export class UserHangarComponent {
  is_hangar_table = false;
  username: string = '';
  user_position: string = '';
  position_color: string = '';
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  fetchData() {
    this.apiService.request("is_admin/", "GET").subscribe(
      (response) => {
        this.router.navigate(['/admin/ships']);
      }
    );
      this.apiService.request('user/', 'GET').subscribe((data: any) => {
        this.username = data.username;
        if (data.pref) {
          this.user_position = "[" + data.pref.name + data.pref.emoji + "]"
          this.position_color = data.pref.color;
        }
      });
  }
  changeHangarTable() {
    this.is_hangar_table = !this.is_hangar_table;
  }
  ngOnInit(): void {
    this.fetchData();
    this.tokenExpirationCheck.startTokenRefreshCheck();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
}

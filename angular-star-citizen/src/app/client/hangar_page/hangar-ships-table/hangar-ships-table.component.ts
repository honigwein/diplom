import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
import { Ship } from '../../../interfaces/ship';
import { MEDIA_URL } from '../../../interfaces/config';
@Component({
  selector: 'app-hangar-ships-table',
  templateUrl: './hangar-ships-table.component.html',
  styleUrl: './hangar-ships-table.component.css'
})
export class HangarShipsTableComponent {
  ships: Ship[] = [];
  user_ships: Ship[] = [];
  filteredShips: Ship[] = [];
  MEDIA_URL = MEDIA_URL;
    constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  fetchData() {
      this.apiService.request("ships/", "GET").subscribe(
        (response) => {
          this.ships = response.all_ships;
          this.filteredShips = response.all_ships;
          this.user_ships = response.user_ships;
        },
        (error) => {
          console.error('Ошибка при получении списка кораблей:', error);
        });
  }
    isUserShip(shipId: string): boolean {
      return this.user_ships.some(userShip => userShip.id === shipId);
  }
  filterData(searchTerm: string) {
    this.filteredShips = this.ships.filter(ship =>
      ship.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
    handleAction() {
      this.fetchData();
    }
    ngOnInit(): void {
      this.fetchData();
      this.tokenExpirationCheck.startTokenRefreshCheck();
    }
    ngOnDestroy(): void {
      this.tokenExpirationCheck.stopTokenRefreshCheck();
    }
}

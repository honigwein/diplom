import { Component } from '@angular/core';
import { AdminMenuComponent } from '../../admin-menu/admin-menu.component';
import { DeleteButtonComponent } from '../../../buttons/delete-button/delete-button.component';
import { ApiService } from '../../../services/api.service';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
import { Ship } from '../../../interfaces/ship';
import { MEDIA_URL } from '../../../interfaces/config';
@Component({
  selector: 'app-admin-ship-table',
  templateUrl: './admin-ship-table.component.html',
  styleUrls: ['./admin-ship-table.component.css']
})
export class AdminShipTableComponent {
  showAddShipForm: boolean = false;
  ships: Ship[] = [];
  filteredShips: Ship[] = [];
  MEDIA_URL = MEDIA_URL;
  tempShipChanges: any = null;
  editedShipId: string | null = null;
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.tokenExpirationCheck.startTokenRefreshCheck();
    this.fetchShips();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
  filterShips(searchTerm: string) {
  this.filteredShips = this.ships.filter(ship => 
    ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
  fetchShips() {
    this.apiService.request("admin/ships/", "GET").subscribe(
      responce => {
        this.ships = responce;
        this.filteredShips = responce;
      },
      error => {
        this.router.navigate(['/events']);
        return;
      }
    );
  }

  
  editShip(ship: Ship): void {
    this.tempShipChanges = { ...ship };
    this.editedShipId = ship.id.toString();
  }
  

  toggleAddShipForm() {
    this.showAddShipForm = !this.showAddShipForm;
  }
  handleAddSuccess() {
    this.showAddShipForm = false;
    this.fetchShips();
  }
  cancelEdit(): void {
  this.tempShipChanges = null;
  this.editedShipId = null;
}

  confirmEdit(): void {
    this.tempShipChanges = null;
    this.editedShipId = null;
    this.fetchShips();
  }
  handleAddCancel() {
    this.showAddShipForm = false;
  }
  handleAction() {
    this.fetchShips();
  }
}
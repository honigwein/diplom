import { Component } from '@angular/core';
import { AdminMenuComponent } from '../../admin-menu/admin-menu.component';
import { Position } from '../../../interfaces/position';
import { ApiService } from '../../../services/api.service';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-positions-table',
  templateUrl: './admin-positions-table.component.html',
  styleUrl: './admin-positions-table.component.css'
})
export class AdminPositionsTableComponent {
  showAddPositionForm: boolean = false;
  positions: Position[] = [];
  filteredPositions: Position[] = [];
  tempPositionChanges: any = null;
  isEmojiMartOpen: boolean = false;
  editedPositionId: string | null = null;
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.tokenExpirationCheck.startTokenRefreshCheck();
    this.fetchPositions();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
  fetchPositions() {
    this.apiService.request("admin/title/", "GET").subscribe((response: any) => {
      if (!response) {
        this.router.navigate(['/events']);
        return;
      }
      this.positions = response;
      this.filteredPositions = response;
    });
  }
  filterData(searchTerm: string) {
    this.filteredPositions = this.positions.filter(position => 
      position.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
  }
  editPosition(position: Position): void {
    this.tempPositionChanges = { ...position };
    this.editedPositionId = position.id.toString();
  }
  toggleAddPositionForm() {
    this.showAddPositionForm = !this.showAddPositionForm;
  }
  handleAddSuccess() {
    this.showAddPositionForm = false;
    this.fetchPositions();
  }
  cancelEdit(): void {
    this.tempPositionChanges = null;
    this.editedPositionId = null;
  }
  confirmEdit(): void {
    this.tempPositionChanges = null;
    this.editedPositionId = null;
    this.fetchPositions();
  }
  handleAddCancel() {
    this.showAddPositionForm = false;
  }
  handleAction() {
    this.fetchPositions();
  }
  toggleEmojiMart(): void {
    this.isEmojiMartOpen = !this.isEmojiMartOpen;
  }
  handleEmojiSelect(emojiObj: any): void {
    this.tempPositionChanges.emoji = emojiObj.emoji.native;
    this.isEmojiMartOpen = false;
  }
}

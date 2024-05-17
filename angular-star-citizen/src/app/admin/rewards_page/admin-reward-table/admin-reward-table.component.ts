import { Component } from '@angular/core';
import { AdminMenuComponent } from '../../admin-menu/admin-menu.component';
import { ApiService } from '../../../services/api.service';
import { TokenExpirationCheck } from '../../../services/token-expiration-check.service';
import { Router } from '@angular/router';
import { MEDIA_URL } from '../../../interfaces/config';
import { Reward } from '../../../interfaces/reward';
@Component({
  selector: 'app-admin-reward-table',
  templateUrl: './admin-reward-table.component.html',
  styleUrl: './admin-reward-table.component.css'
})
export class AdminRewardTableComponent {
  showAddShipForm: boolean = false;
  MEDIA_URL = MEDIA_URL;
  rewards: Reward[] = [];
  filteredRewards: Reward[] = [];
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.tokenExpirationCheck.startTokenRefreshCheck();
    this.fetchRewards();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
  filterData(searchTerm: string) {
    this.filteredRewards = this.rewards.filter(reward =>
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  fetchRewards() {
    this.apiService.request("admin/rewards/", "GET").subscribe(
      responce => {
        this.rewards = responce;
        this.filteredRewards = responce;
      },
      error => {
        this.router.navigate(['/events']);
        return;
      }
    );
  }
  toggleAddShipForm() {
    this.showAddShipForm = !this.showAddShipForm;
  }

  handleAddSuccess() {
    this.showAddShipForm = false;
    this.fetchRewards();
  }

  handleAddCancel() {
    this.showAddShipForm = false;
  }
  handleAction() {
    this.fetchRewards();
  }
}

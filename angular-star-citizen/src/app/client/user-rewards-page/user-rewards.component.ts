import { Component } from '@angular/core';
import { TokenExpirationCheck } from '../../services/token-expiration-check.service';
import { ApiService } from '../../services/api.service';
import { Reward } from '../../interfaces/reward';
import { MEDIA_URL } from '../../interfaces/config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-rewards',
  templateUrl: './user-rewards.component.html',
  styleUrl: './user-rewards.component.css'
})
export class UserRewardsComponent {
  rewards: Reward[] = [];
  MEDIA_URL = MEDIA_URL;
  filteredRewards: Reward[] = [];
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  fetchData() {
    this.apiService.request("is_admin/", "GET").subscribe(
      (response) => {
        this.router.navigate(['/admin/rewards']);
      }
    );
    this.apiService.request("user_rewards/", "GET").subscribe((response: any) => {
      if (!response) {
        return;
      }
      this.rewards = response;
      this.filteredRewards = this.rewards;
    });
  }
  filterData(searchTerm: string) {
    this.filteredRewards = this.rewards.filter((reward: Reward) => {
      return reward.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
  ngOnInit(): void {
    this.tokenExpirationCheck.startTokenRefreshCheck();
    this.fetchData();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }

}

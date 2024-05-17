import { Component, Input, SimpleChanges } from '@angular/core';
import { Event } from '../../../interfaces/event';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { Reward } from '../../../interfaces/reward';
@Component({
  selector: 'app-admin-event-give-rewards',
  templateUrl: './admin-event-give-rewards.component.html',
  styleUrl: './admin-event-give-rewards.component.css'
})
export class AdminEventGiveRewardsComponent {
  @Input() event: Event | null = null;
  users: User[] = [];
  rewards: Reward[] = [];
  selectedReward: Reward | null = null;
  userRewards: { [key: string]: number[] } = {};
  users_ids: string[] = [];
  constructor(private apiService: ApiService) { }
  fetchRewards() {
    this.apiService.request("admin/rewards/", "GET").subscribe((response: any) => {
      if (!response) {
        return;
      }
      this.rewards = response;
    });
    this.users = this.event?.application.filter((application) => application.is_conf).map(application => ({ id: application.user_id, username: application.user })) || [];
    this.users_ids = this.users.map(user => user.id);
    if (this.event) {
      this.apiService.request("admin/users_and_rewards/", "POST", { users_ids:this.users_ids }).subscribe(
        response => {
          this.userRewards = response;
        },
        error => {
          console.log(error);
        });
    }
  }
  handleRewardClick(event: any) {
    const rewardId = event.target.value;
    this.selectedReward = this.rewards.find((reward) => reward.id == rewardId) || null;
  }
  checkRewardsDisabled() {
    const event_date_utc = new Date(this.event?.datetime || 0);
    const event_date_local = new Date(event_date_utc.getTime() + event_date_utc.getTimezoneOffset() * 60000);
    const now = new Date();
    return event_date_local >= now;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.fetchRewards();
  }
  handleGiveReward() {
    if (this.event) {
      this.apiService.request("admin/users_and_rewards/", "POST", { users_ids: this.users_ids }).subscribe(
        response => {
          this.userRewards = response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  userHasReward(user: User): boolean {
    const userRewards = this.userRewards[user.id]?.map((reward: any) => reward.id) || [];
    return userRewards.includes(this.selectedReward?.id || -1);
  }
}

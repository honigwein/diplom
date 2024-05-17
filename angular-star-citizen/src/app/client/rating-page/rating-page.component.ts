import { Component } from '@angular/core';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { ApiService } from '../../services/api.service';
import { TokenExpirationCheck } from '../../services/token-expiration-check.service';
import { Router } from '@angular/router';
import { Rating } from '../../interfaces/rating';
@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrl: './rating-page.component.css'
})
export class RatingPageComponent {
  rating: Rating[] = [];
  filteredRating: Rating[] = [];
  isAdmin: boolean = false;
  constructor(private tokenExpirationCheck: TokenExpirationCheck, private apiService: ApiService, private router: Router) { }
  fetchData() {
    this.apiService.request("is_admin/", "GET").subscribe(
      (response) => {
        this.isAdmin = true;
      },
      (error) => {
        this.isAdmin = false;
        }
      );
    this.apiService.request("rating/", "GET").subscribe((response: any) => {
      if (!response) {
        this.router.navigate(['/events']);
        return;
      }
      this.rating = response;
      this.filteredRating = this.rating.filter(rating => rating.reward_cost !== null && rating.reward_cost !== 0);
      this.filteredRating = this.filteredRating.sort((a, b) => b.reward_cost - a.reward_cost);
    });
    
  }
  filterData(searchTerm: string) {
    this.filteredRating = this.rating.filter(rating => 
      rating.username.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  ngOnInit(): void {
    this.fetchData();
    this.tokenExpirationCheck.startTokenRefreshCheck();
  }
  ngOnDestroy(): void {
    this.tokenExpirationCheck.stopTokenRefreshCheck();
  }
}

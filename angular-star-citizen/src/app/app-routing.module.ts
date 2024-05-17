import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './client/login-page/login-page.component';
import { EventsPageComponent } from './client/events-page/events-page.component';
import { AdminShipTableComponent } from './admin/ships_page/admin-ship-table/admin-ship-table.component';
import { AdminRewardTableComponent } from './admin/rewards_page/admin-reward-table/admin-reward-table.component';
import { AuthGuard } from './services/auth.guard';
import { AdminPositionsTableComponent } from './admin/positions_page/admin-positions-table/admin-positions-table.component';
import { AdminEventsTableComponent } from './admin/events_page/admin-events-table/admin-events-table.component';
import { AdminRolesTableComponent } from './admin/roles_page/admin-roles-table/admin-roles-table.component';
import { RatingPageComponent } from './client/rating-page/rating-page.component';
import { UserHangarComponent } from './client/hangar_page/user-hangar/user-hangar.component';
import { UsersShipsTableComponent } from './client/users-ships_page/users-ships-table/users-ships-table.component';
import { UserRewardsComponent } from './client/user-rewards-page/user-rewards.component';
const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'events', component: EventsPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/ships', component: AdminShipTableComponent, canActivate: [AuthGuard] },
  { path: 'admin/rewards', component: AdminRewardTableComponent, canActivate: [AuthGuard] },
  { path: 'admin/positions', component: AdminPositionsTableComponent, canActivate: [AuthGuard] },
  { path: 'admin/events', component: AdminEventsTableComponent, canActivate: [AuthGuard] },
  { path: 'admin/roles', component: AdminRolesTableComponent, canActivate: [AuthGuard] },
  { path: 'rating', component: RatingPageComponent, canActivate: [AuthGuard] },
  { path: 'hangar', component: UserHangarComponent, canActivate: [AuthGuard] },
  { path: 'ships', component: UsersShipsTableComponent, canActivate: [AuthGuard] },
  { path: 'rewards', component: UserRewardsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/events' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

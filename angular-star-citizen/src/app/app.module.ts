import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './client/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsPageComponent } from './client/events-page/events-page.component';
import { AddButtonComponent } from './buttons/add-button/add-button.component';
import { DeleteButtonComponent } from './buttons/delete-button/delete-button.component';
import { PutButtonComponent } from './buttons/put-button/put-button.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { AddShipFormComponent } from './admin/ships_page/app-add-ship-form/app-add-ship-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminShipTableComponent } from './admin/ships_page/admin-ship-table/admin-ship-table.component';
import { AddRewardFormComponent } from './admin/rewards_page/add-reward-form/add-reward-form.component';
import { AdminRewardTableComponent } from './admin/rewards_page/admin-reward-table/admin-reward-table.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminRolesTableComponent } from './admin/roles_page/admin-roles-table/admin-roles-table.component';
import { AddRoleFormComponent } from './admin/roles_page/add-role-form/add-role-form.component';
import { AdminPositionsTableComponent } from './admin/positions_page/admin-positions-table/admin-positions-table.component';
import { AddPositionFormComponent } from './admin/positions_page/add-position-form/add-position-form.component';
import { UsersShipsTableComponent } from './client/users-ships_page/users-ships-table/users-ships-table.component';
import { AdminEventsTableComponent } from './admin/events_page/admin-events-table/admin-events-table.component';
import { AddEventFormComponent } from './admin/events_page/add-event-form/add-event-form.component';
import { UserHangarComponent } from './client/hangar_page/user-hangar/user-hangar.component';
import { RatingPageComponent } from './client/rating-page/rating-page.component';
import { UserMenuComponent } from './client/user-menu/user-menu.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ColorPickerModule } from 'ngx-color-picker';
import { AdminEventsListComponent } from './admin/events_page/admin-events-list/admin-events-list.component';
import { AdminEventRolesListComponent } from './admin/events_page/admin-event-roles-list/admin-event-roles-list.component';
import { AdminEventRoleUsersListComponent } from './admin/events_page/admin-event-role-users-list/admin-event-role-users-list.component';
import { AdminEventGiveRewardsComponent } from './admin/events_page/admin-event-give-rewards/admin-event-give-rewards.component';
import { HangarShipsTableComponent } from './client/hangar_page/hangar-ships-table/hangar-ships-table.component';
import { UserRewardsComponent } from './client/user-rewards-page/user-rewards.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EventsPageComponent,
    AddButtonComponent,
    DeleteButtonComponent,
    PutButtonComponent,
    SearchInputComponent,
    AddShipFormComponent,
    AdminShipTableComponent,
    AddRewardFormComponent,
    AdminRewardTableComponent,
    AdminMenuComponent,
    AdminRolesTableComponent,
    AddRoleFormComponent,
    AdminPositionsTableComponent,
    AddPositionFormComponent,
    UsersShipsTableComponent,
    AdminEventsTableComponent,
    AddEventFormComponent,
    UserHangarComponent,
    RatingPageComponent,
    UserMenuComponent,
    AdminEventsListComponent,
    AdminEventRolesListComponent,
    AdminEventRoleUsersListComponent,
    AdminEventGiveRewardsComponent,
    HangarShipsTableComponent,
    UserRewardsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PickerComponent,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

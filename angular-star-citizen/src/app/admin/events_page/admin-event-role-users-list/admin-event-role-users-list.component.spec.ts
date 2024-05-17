import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventRoleUsersListComponent } from './admin-event-role-users-list.component';

describe('AdminEventRoleUsersListComponent', () => {
  let component: AdminEventRoleUsersListComponent;
  let fixture: ComponentFixture<AdminEventRoleUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEventRoleUsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEventRoleUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

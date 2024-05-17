import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventRolesListComponent } from './admin-event-roles-list.component';

describe('AdminEventRolesListComponent', () => {
  let component: AdminEventRolesListComponent;
  let fixture: ComponentFixture<AdminEventRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEventRolesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEventRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

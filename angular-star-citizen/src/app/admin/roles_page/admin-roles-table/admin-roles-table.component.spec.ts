import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRolesTableComponent } from './admin-roles-table.component';

describe('AdminRolesTableComponent', () => {
  let component: AdminRolesTableComponent;
  let fixture: ComponentFixture<AdminRolesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRolesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRolesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

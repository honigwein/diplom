import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRewardTableComponent } from './admin-reward-table.component';

describe('AdminRewardTableComponent', () => {
  let component: AdminRewardTableComponent;
  let fixture: ComponentFixture<AdminRewardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRewardTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRewardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

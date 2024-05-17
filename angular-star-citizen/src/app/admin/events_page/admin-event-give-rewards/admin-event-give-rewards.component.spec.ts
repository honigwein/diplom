import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventGiveRewardsComponent } from './admin-event-give-rewards.component';

describe('AdminEventGiveRewardsComponent', () => {
  let component: AdminEventGiveRewardsComponent;
  let fixture: ComponentFixture<AdminEventGiveRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEventGiveRewardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEventGiveRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

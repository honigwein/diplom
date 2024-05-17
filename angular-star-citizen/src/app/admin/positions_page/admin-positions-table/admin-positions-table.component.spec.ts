import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPositionsTableComponent } from './admin-positions-table.component';

describe('AdminPositionsTableComponent', () => {
  let component: AdminPositionsTableComponent;
  let fixture: ComponentFixture<AdminPositionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPositionsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPositionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShipTableComponent } from './admin-ship-table.component';

describe('AdminShipTableComponent', () => {
  let component: AdminShipTableComponent;
  let fixture: ComponentFixture<AdminShipTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShipTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminShipTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

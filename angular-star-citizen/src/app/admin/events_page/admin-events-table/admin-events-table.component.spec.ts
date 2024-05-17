import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsTableComponent } from './admin-events-table.component';

describe('AdminEventsTableComponent', () => {
  let component: AdminEventsTableComponent;
  let fixture: ComponentFixture<AdminEventsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEventsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEventsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

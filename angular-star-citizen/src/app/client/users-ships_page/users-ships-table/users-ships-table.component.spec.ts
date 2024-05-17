import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersShipsTableComponent } from './users-ships-table.component';

describe('UsersShipsTableComponent', () => {
  let component: UsersShipsTableComponent;
  let fixture: ComponentFixture<UsersShipsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersShipsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersShipsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

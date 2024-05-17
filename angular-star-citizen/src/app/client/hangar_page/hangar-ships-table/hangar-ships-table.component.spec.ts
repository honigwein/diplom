import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangarShipsTableComponent } from './hangar-ships-table.component';

describe('HangarShipsTableComponent', () => {
  let component: HangarShipsTableComponent;
  let fixture: ComponentFixture<HangarShipsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HangarShipsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HangarShipsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

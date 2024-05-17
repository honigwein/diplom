import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddShipFormComponent } from './app-add-ship-form.component';

describe('AppAddShipFormComponent', () => {
  let component: AppAddShipFormComponent;
  let fixture: ComponentFixture<AppAddShipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppAddShipFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppAddShipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

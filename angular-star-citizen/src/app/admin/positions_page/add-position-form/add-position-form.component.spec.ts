import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPositionFormComponent } from './add-position-form.component';

describe('AddPositionFormComponent', () => {
  let component: AddPositionFormComponent;
  let fixture: ComponentFixture<AddPositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPositionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

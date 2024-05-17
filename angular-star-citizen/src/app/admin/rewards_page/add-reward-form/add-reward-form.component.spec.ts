import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRewardFormComponent } from './add-reward-form.component';

describe('AddRewardFormComponent', () => {
  let component: AddRewardFormComponent;
  let fixture: ComponentFixture<AddRewardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRewardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRewardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

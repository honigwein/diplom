import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHangarComponent } from './user-hangar.component';

describe('UserHangarComponent', () => {
  let component: UserHangarComponent;
  let fixture: ComponentFixture<UserHangarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHangarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserHangarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutButtonComponent } from './put-button.component';

describe('PutButtonComponent', () => {
  let component: PutButtonComponent;
  let fixture: ComponentFixture<PutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PutButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

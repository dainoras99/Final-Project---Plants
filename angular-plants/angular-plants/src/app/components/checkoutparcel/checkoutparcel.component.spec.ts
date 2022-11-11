import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutparcelComponent } from './checkoutparcel.component';

describe('CheckoutparcelComponent', () => {
  let component: CheckoutparcelComponent;
  let fixture: ComponentFixture<CheckoutparcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutparcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutparcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

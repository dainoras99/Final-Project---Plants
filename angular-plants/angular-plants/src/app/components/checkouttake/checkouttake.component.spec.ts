import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckouttakeComponent } from './checkouttake.component';

describe('CheckouttakeComponent', () => {
  let component: CheckouttakeComponent;
  let fixture: ComponentFixture<CheckouttakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckouttakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckouttakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckouthomeComponent } from './checkouthome.component';

describe('CheckouthomeComponent', () => {
  let component: CheckouthomeComponent;
  let fixture: ComponentFixture<CheckouthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckouthomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckouthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

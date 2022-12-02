import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsManagementComponent } from './plants-management.component';

describe('PlantsManagementComponent', () => {
  let component: PlantsManagementComponent;
  let fixture: ComponentFixture<PlantsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsFormComponent } from './plants-form.component';

describe('PlantsFormComponent', () => {
  let component: PlantsFormComponent;
  let fixture: ComponentFixture<PlantsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

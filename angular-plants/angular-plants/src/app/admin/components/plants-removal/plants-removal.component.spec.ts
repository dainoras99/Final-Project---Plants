import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsRemovalComponent } from './plants-removal.component';

describe('PlantsRemovalComponent', () => {
  let component: PlantsRemovalComponent;
  let fixture: ComponentFixture<PlantsRemovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsRemovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

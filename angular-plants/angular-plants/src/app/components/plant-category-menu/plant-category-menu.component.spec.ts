import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCategoryMenuComponent } from './plant-category-menu.component';

describe('PlantCategoryMenuComponent', () => {
  let component: PlantCategoryMenuComponent;
  let fixture: ComponentFixture<PlantCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCategoryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { PlantCategory } from 'src/app/common/plant-category';
import { ProductService } from 'src/app/services/product.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-plant-category-menu',
  templateUrl: './plant-category-menu.component.html',
  styleUrls: ['./plant-category-menu.component.css']
})
export class PlantCategoryMenuComponent implements OnInit {

  plantCategory: PlantCategory[] = [];

  constructor(private productService: ProductService, private titleService: Title) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getPlantCategories().subscribe(
      data => {
        this.plantCategory = data;
        this.titleService.setTitle(`Augalų Oazė - www.augaluoaze.lt`);
      }
    );
  }
}

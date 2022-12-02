import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/common/plant';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-plants-removal',
  templateUrl: './plants-removal.component.html',
  styleUrls: ['./plants-removal.component.css']
})
export class PlantsRemovalComponent implements OnInit {

  plants: Plant[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.searchProducts("").subscribe(data => {
      this.plants = data;
    });
  }

  deletePlant(id: number) {
    this.productService.removePlant(id).subscribe(
      {
        next: response => {
          this.loadProducts();
          alert(response);
        },
        error: err => {
          alert(err);
        }
      }
    )
  }

}

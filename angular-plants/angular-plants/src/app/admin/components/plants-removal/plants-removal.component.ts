import { Component, OnInit } from '@angular/core';
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
    this.productService.getProductList();
  }

}

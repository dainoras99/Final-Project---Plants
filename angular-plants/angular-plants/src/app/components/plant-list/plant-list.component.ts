import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/common/plant';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  plants: Plant[] = [];
  currentCategoryId: number = 1;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listPlants();
    });
  }

  listPlants() {

    //patikrint ar id available 
    const categoryIdValid: boolean = this.route.snapshot.paramMap.has('id');

    if (categoryIdValid) {
      // paimt id param string ir konvertint string i numberi su "+" simboliu
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      //jeigu ner category id tokio padarom default 3
      this.currentCategoryId = 3;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.plants = data;
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/common/plant';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {


  plant!: Plant;

  constructor(private productService: ProductService, private route: ActivatedRoute, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handlePlantDetails();
    })
  }

  handlePlantDetails() {
    // gauti id param string ir convertuot is stringo i numberi naujoant +;
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getPlant(productId).subscribe(
      data => {
        this.plant = data;
      }
    )
  }

}

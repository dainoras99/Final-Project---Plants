import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/common/plant';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {

  plant!: Plant;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    public authenticationService: AuthenticationService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handlePlantDetails();
    })
  }

  handlePlantDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getPlant(productId).subscribe(
      data => {
        this.plant = data;
      }
    )
  }

  addToCart(plant: Plant) {
    let username = this.authenticationService.getLoggedInUserName();
    
    this.cartService.postCartItem(username!, plant.name!).subscribe(
      {
        next: response => {
          console.log("pridėtas");
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }
}

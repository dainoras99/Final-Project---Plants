import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartSession } from 'src/app/common/cart-session';
import { Plant } from 'src/app/common/plant';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { DiscountService } from 'src/app/services/discount.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {

  plant!: Plant;
  cartSession!: CartSession;
  
  isDiscount!: Observable<boolean>;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    public authenticationService: AuthenticationService, private cartService: CartService,
    private orderService: OrderService, private discountService: DiscountService, private titleService: Title) {
      // this.titleService.setTitle(this.plant.name);
     }

  ngOnInit(): void {
    this.isDiscount = this.discountService.getisDiscount();
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
         this.cartSession = JSON.parse(response);
         this.cartService.setCartData(this.cartSession);
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }
}

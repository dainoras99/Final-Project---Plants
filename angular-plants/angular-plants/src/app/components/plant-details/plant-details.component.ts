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
import {Title, Meta} from "@angular/platform-browser";

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
    private orderService: OrderService, private discountService: DiscountService, private titleService: Title,
    private meta: Meta) {}

  ngOnInit(): void {
    this.isDiscount = this.discountService.getisDiscount();
    this.route.paramMap.subscribe(() => {
      this.handlePlantDetails();
    })
  }


  handlePlantDetails() {
    const productName: string = this.route.snapshot.paramMap.get('name')!;

    this.productService.getPlant(productName).subscribe(
      data => {
        this.plant = data;

        this.titleService.setTitle(`${this.plant.name} - www.augaluoaze.lt`);

        let description: string[] = this.plant.description.split('.');
        this.meta.updateTag({ name: 'description', content: description[0] })
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

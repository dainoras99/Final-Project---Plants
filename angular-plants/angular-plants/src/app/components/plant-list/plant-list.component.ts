import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartSession } from 'src/app/common/cart-session';
import { Plant } from 'src/app/common/plant';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { DiscountService } from 'src/app/services/discount.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  plants: Plant[] = [];
  currentCategoryId: number = 1;
  isSearch: boolean = false;
  user!: User;
  isDiscount: boolean = false;

  cartSession!: CartSession;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService,
    private cartService: CartService,
    private orderService: OrderService, private discountService: DiscountService, private titleService: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Augalų Oazė - www.augaluoaze.lt`);
    this.meta.updateTag({ name: 'description', content: 'Internetinė augalų parduotuvė - internetinės prekybos lyderiai Lietuvoje bei viena didžiausių augalais prekiaujančių įmonių Lietuvoje ir Rytų Europoje.' })
    this.loadOrdersCount();
    this.route.paramMap.subscribe(() => {
      this.listPlants();
    });
  }

  loadOrdersCount() {
    this.orderService.getOrders(this.authenticationService.getLoggedInUserName()!).subscribe(response => {
      if (response.length % 5 == 0) {
        this.isDiscount = true;
        this.discountService.setisDiscount(true);
      }
      else {
        this.isDiscount = false;
        this.discountService.setisDiscount(false);
      }
    });
  }

  listPlants() {
    this.isSearch = this.route.snapshot.paramMap.has('keyword');
    if (this.isSearch) this.handleSearchPlants();
    else this.handleListPlants();
  }

  
  handleSearchPlants() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.plants = data;
      }
    )
  }

  handleListPlants() {
    const categoryIdValid: boolean = this.route.snapshot.paramMap.has('id');

    if (categoryIdValid) this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    else this.currentCategoryId = 3;

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.plants = data;
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
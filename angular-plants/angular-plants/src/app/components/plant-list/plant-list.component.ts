import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/common/plant';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              public authenticationService: AuthenticationService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listPlants();
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
          console.log("pridėtas produktas");
        },
        error: err => {
          console.log(err);
        }
      }
    )
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppComponent } from 'src/app/app.component';
import { Plant } from 'src/app/common/plant';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { CartStatusComponent } from '../cart-status/cart-status.component';

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

  private refreshCartComponent= new BehaviorSubject<boolean>(true);

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              public authenticationService: AuthenticationService,
              private cartService: CartService, private dialogRef: MatDialog, private sideNavService: SidenavService) { }

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

    if (categoryIdValid) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 3;
    }

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
          console.log("pridėtas");
        },
        error: err => {
          console.log(err);
        }
      }
    )
    }
}

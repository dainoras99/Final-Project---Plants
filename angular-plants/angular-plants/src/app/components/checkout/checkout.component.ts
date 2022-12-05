import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { GiftCard } from 'src/app/common/gift-card';
import { GiftCardObject } from 'src/app/common/gift-card-object';
import { Shop } from 'src/app/common/shop';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { GiftCardService } from 'src/app/services/gift-card.service';
import { OrderTypesService } from 'src/app/services/order-types.service';
import { OrderService } from 'src/app/services/order.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  typeSelected: any;
  shopSelected: any;
  cartSession!: CartSession;
  selectedTotal!: number;
  shopId!: number;
  cartItems: CartItem[] = [];
  cartItem!: CartItem
  shopsList: Shop[] = [];

  giftCardCode: string = '';
  giftCard!: GiftCardObject;
  updateGiftCard!: GiftCardObject;
  giftCardError: boolean = false;
  disabledButton: string = '';

  checkoutFormGroup!: FormGroup;
  constructor(private router: Router,
    private cartService: CartService,
    private orderTypesService: OrderTypesService,
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private giftCardService: GiftCardService,) { }

  ngOnInit(): void {
    this.handleShops();
    this.cartService.getCartData().subscribe((data) => {
      this.cartSession = data;
    });
    // this.userItemsService.selectedProducts.subscribe((data) => {
    //   this.selectedProducts = data;
    // });
    // this.userItemsService.selectedTotalPrice.subscribe((data) => {
    //   this.selectedTotal = data;
    // });
  }

  handleShops() {
    this.orderTypesService.getShopsList().subscribe(
      data => {
        this.shopsList = data;
      }
    );
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/checkout']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['checkout/home']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['checkout/parcel']);
  }

  selectedShop(event: any) {
    this.shopSelected = event.target.value;
  }

  get getTypeSelected() {
    return this.typeSelected;
  }

  postOrder() {
    if (this.shopSelected === undefined) this.shopSelected = "Vilnius, Šeimyniškių g. 31";

    // 
    this.shopsList.forEach(shop => {
      if (this.shopSelected === shop.address + ", " + shop.city) this.shopId = shop.id;
    });
    // 


    this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "shop", this.shopId, null!)
      .subscribe(
        {
          next: response => {
            alert(response);
            this.cartService.setCartData(null!);
            this.router.navigate(['/plants']);
          },
          error: err => {
            alert("Svetainės klaida, kreipkitės į administratorių");
            this.router.navigate(['/plants']);
          }
        }
      );

      if (this.giftCard != null) {
        this.giftCardService.updateGiftCard(this.giftCard).subscribe(
          {
            next: response => {
              console.log(response);
            },
            error: err => {
              alert("Svetainės klaida, kreipkitės į administratorių");
              this.router.navigate(['/plants']);
            }
          }
        )
      }

  }

  codeUsed(giftCardCode: string) {
    this.giftCardService.getGiftCard(giftCardCode).subscribe(
      data => {
        this.giftCard = data;
        if(this.giftCard==null) this.giftCardError = true;
        else {
          this.disabledButton = 'disabled';
          this.giftCardError = false;

          console.log("remaining balance: " + this.giftCard.remainingBalance);
          console.log("used balance: " + this.giftCard.usedBalance);
        
          if (this.giftCard.remainingBalance > this.cartSession.total_price) {
            this.giftCard.remainingBalance -= this.cartSession.total_price
            this.giftCard.usedBalance = this.giftCard.sum - this.giftCard.remainingBalance;
          }
          if (this.giftCard.remainingBalance <= this.cartSession.total_price) {
            this.giftCard.usedBalance = this.giftCard.remainingBalance;
            this.giftCard.remainingBalance = 0;
          }
          console.log(this.giftCard.remainingBalance);
        }
      }
    )
  }
}
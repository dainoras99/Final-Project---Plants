import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { GiftCardObject } from 'src/app/common/gift-card-object';
import { Parcel } from 'src/app/common/parcel';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { DiscountService } from 'src/app/services/discount.service';
import { GiftCardService } from 'src/app/services/gift-card.service';
import { OrderTypesService } from 'src/app/services/order-types.service';
import { OrderService } from 'src/app/services/order.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-checkoutparcel',
  templateUrl: './checkoutparcel.component.html',
  styleUrls: ['./checkoutparcel.component.css']
})
export class CheckoutparcelComponent implements OnInit {
  typeSelected: any;
  cartSession!: CartSession;
  parcelList: Parcel[] = [];
  parcelSelected: any;
  parcelId!: number;
  cartItems: CartItem[] = [];
  cartItem!: CartItem;

  giftCardCode: string = '';
  giftCard!: GiftCardObject;
  updateGiftCard!: GiftCardObject;
  giftCardError: boolean = false;
  disabledButton: string = '';
  remainingBalanceBeforeUse: number = 0;

  isDiscount!: Observable<boolean>

  constructor(private router: Router, 
    private cartService: CartService,
    private orderTypesService: OrderTypesService, 
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private giftCardService: GiftCardService,
    private discountService: DiscountService) { }

  ngOnInit(): void {
    this.isDiscount = this.discountService.getisDiscount();
    this.handleParcels();
    this.cartService.getCartData().subscribe((data) => {
      this.cartSession = data;
    });
  }

  handleParcels() {
   this.orderTypesService.getParcelsList().subscribe(
      data => {
        this.parcelList = data;
      }
    );
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/checkout']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['checkout/home']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['checkout/parcel']);
  }

  selectedParcel(event: any) {
    this.parcelSelected = event.target.value;
  }

  get getTypeSelected() {
    return this.typeSelected;
  }

  postOrder() {
  if (this.parcelSelected === undefined) this.parcelSelected = "Akropolis - Vilnius, Ozo g. 25, 07150";

  // 
  this.parcelList.forEach(parcel => {
    if (this.parcelSelected === parcel.name + " - " + parcel.city + ", " + parcel.address + ", " + parcel.zipCode) this.parcelId = parcel.id;
  });
  // 

  this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "parcel",  this.parcelId, null!)
    .subscribe(
      {
        next: response => {
          this.orderService.getOrders(this.authenticationService.getLoggedInUserName()!).subscribe(response => {
            if (response.length % 5 == 0) {
              alert("Jūs jau pateikėte " + response.length + " užsakymų/us. Dovanojame jums 25% nuolaida sekančiam apsipirkimui!");
            }
            else alert("Užsakymas pateiktas!");

            this.cartService.setCartData(null!);
            this.router.navigate(['/plants']);
        })
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
          this.remainingBalanceBeforeUse = this.giftCard.remainingBalance;
        
          if (this.remainingBalanceBeforeUse > this.cartSession.total_price) {
            this.giftCard.usedBalance = this.cartSession.total_price;
            this.giftCard.remainingBalance = this.remainingBalanceBeforeUse - this.giftCard.usedBalance;
          }
          if (this.remainingBalanceBeforeUse <= this.cartSession.total_price) {
            this.giftCard.remainingBalance = 0;
            this.giftCard.usedBalance = this.remainingBalanceBeforeUse;
          }
        }
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { GiftCardObject } from 'src/app/common/gift-card-object';
import { Shop } from 'src/app/common/shop';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { DiscountService } from 'src/app/services/discount.service';
import { GiftCardService } from 'src/app/services/gift-card.service';
import { OrderTypesService } from 'src/app/services/order-types.service';
import { OrderService } from 'src/app/services/order.service';

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
  user!: User;

  giftCardCode: string = '';
  giftCard!: GiftCardObject;
  updateGiftCard!: GiftCardObject;
  giftCardError: boolean = false;
  disabledButton: string = '';
  remainingBalanceBeforeUse: number = 0;
  
  oldBalance!: number;

  isDiscount!: boolean

  count: number = 0;

  total_price: number = 0;

  checkoutFormGroup!: FormGroup;
  constructor(private router: Router,
    private cartService: CartService,
    private orderTypesService: OrderTypesService,
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private giftCardService: GiftCardService,
    private discountService: DiscountService) { }

  ngOnInit(): void {
    this.subscribeDiscount();
    this.handleShops();
    this.cartService.getCartData().subscribe((data) => {
      this.cartSession = data;
      this.total_price = this.cartSession.total_price;
      if (this.isDiscount) {
        this.total_price = this.cartSession.total_price - this.cartSession.total_price * 0.25;
        console.log(this.total_price);
      }
    });
    this.total_price = +this.total_price.toFixed(2);
  }

  subscribeDiscount() {
    this.discountService.getisDiscount().subscribe(response => {
      this.isDiscount = response;
    })
  }

  handleShops() {
    this.orderTypesService.getShopsList().subscribe(
      data => {
        this.shopsList = data;
      }
    );
    this.ordersCount();
  }

  ordersCount() {
    this.orderService.getOrders(this.authenticationService.getLoggedInUserName()!).subscribe(response => {
      this.count = response.length;
      console.log(this.count);
    }
    );
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/atsiskaitymas']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['atsiskaitymas/i-namus']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['atsiskaitymas/i-pastomata']);
  }

  selectedShop(event: any) {
    this.shopSelected = event.target.value;
  }

  get getTypeSelected() {
    return this.typeSelected;
  }

  pay(amount: any, theEmail: any) {
    var handler = (<any>window).StripeCheckout.configure({
      currency: "EUR",
      email: theEmail,
      key: 'pk_test_51MP391DkOj7oXrK7NNq8UqTc7yg0UTaRPQ0wgDIRy4spp367dIUJ1hV7Dv1EYP9NWWu1IoXccISuIZ3wjczbvKuR00LMLfDVXQ',
      locale: 'auto',
      token: (token: any) => {
        if (this.shopSelected === undefined) this.shopSelected = "Vilnius, Šeimyniškių g. 31";

        // 
        this.shopsList.forEach(shop => {
          if (this.shopSelected === shop.address + ", " + shop.city) this.shopId = shop.id;
        });
        // 

        this.cartSession.total_price = this.total_price;


        this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "shop", this.shopId, null!)
          .subscribe(
            {
              next: response => {

                this.orderService.getOrders(this.authenticationService.getLoggedInUserName()!).subscribe(response => {
                  if (response.length % 5 == 0) {
                    alert("Jūs jau pateikėte " + response.length + " užsakymų/us. Dovanojame jums 25% nuolaida sekančiam apsipirkimui!");
                  }
                  else alert("Užsakymas pateiktas!");

                  this.cartService.setCartData(null!);
                  this.router.navigate(['/augalai']);
                })
              },
              error: err => {
                alert("Svetainės klaida, kreipkitės į administratorių");
                this.router.navigate(['/augalai']);
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
                this.router.navigate(['/augalai']);
              }
            }
          )
        }
      }
    });
    handler.open({
      name: 'Augalų Oazė',
      description: 'Augalų elektroninė pardutuovė',
      amount: (amount * 100).toFixed(2)
    });

  }

  postOrder() {
    this.authenticationService.getUserByUsername().subscribe(
      data => {
        this.user = data;
        if (this.giftCard != null) {
          if (this.total_price > this.oldBalance) {
            this.pay(this.total_price - this.oldBalance, this.user.email);
          }
          if (this.total_price <= this.oldBalance) {
            if (this.shopSelected === undefined) this.shopSelected = "Vilnius, Šeimyniškių g. 31";

            // 
            this.shopsList.forEach(shop => {
              if (this.shopSelected === shop.address + ", " + shop.city) this.shopId = shop.id;
            });
            // 

            this.cartSession.total_price = this.total_price;


            this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "shop", this.shopId, null!)
              .subscribe(
                {
                  next: response => {

                    this.orderService.getOrders(this.authenticationService.getLoggedInUserName()!).subscribe(response => {
                      if (response.length % 5 == 0) {
                        alert("Jūs jau pateikėte " + response.length + " užsakymų/us. Dovanojame jums 25% nuolaida sekančiam apsipirkimui!");
                      }
                      else alert("Užsakymas pateiktas!");

                      this.cartService.setCartData(null!);
                      this.router.navigate(['/augalai']);
                    })
                  },
                  error: err => {
                    alert("Svetainės klaida, kreipkitės į administratorių");
                    this.router.navigate(['/augalai']);
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
                    this.router.navigate(['/augalai']);
                  }
                }
              )
            }
          }
        }
        else {
          this.pay(this.total_price, this.user.email);
        }
      }
    )
  }

  codeUsed(giftCardCode: string) {
    this.giftCardService.getGiftCard(giftCardCode).subscribe(
      data => {
        this.giftCard = data;
        this.oldBalance = this.giftCard.remainingBalance;
        if (this.giftCard == null) this.giftCardError = true;
        else {
          this.disabledButton = 'disabled';
          this.giftCardError = false;
          this.remainingBalanceBeforeUse = this.giftCard.remainingBalance;

          if (this.remainingBalanceBeforeUse > this.total_price) {
            this.giftCard.usedBalance = this.total_price;
            this.giftCard.remainingBalance = this.remainingBalanceBeforeUse - this.giftCard.usedBalance;
          }
          if (this.remainingBalanceBeforeUse <= this.total_price) {
            this.giftCard.remainingBalance = 0;
            this.giftCard.usedBalance = this.remainingBalanceBeforeUse;
          }
        }
      }
    )
  }
}
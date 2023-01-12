import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { Delivery } from 'src/app/common/delivery';
import { GiftCardObject } from 'src/app/common/gift-card-object';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { DiscountService } from 'src/app/services/discount.service';
import { GiftCardService } from 'src/app/services/gift-card.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkouthome',
  templateUrl: './checkouthome.component.html',
  styleUrls: ['./checkouthome.component.css']
})
export class CheckouthomeComponent implements OnInit {

  delivery: Delivery = new Delivery();
  typeSelected: any;
  radioButtonSelected: any;
  cartItems: CartItem[] = [];
  cartItem!: CartItem
  errors: boolean = false;
  tips = "none";
  cartSession!: CartSession;
  user!: User;

  giftCardCode: string = '';
  giftCard!: GiftCardObject;
  updateGiftCard!: GiftCardObject;
  giftCardError: boolean = false;
  disabledButton: string = '';
  remainingBalanceBeforeUse: number = 0;
  oldBalance!: number;

  isDiscount!: boolean
  total_price: number = 0;

  constructor(private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private giftCardService: GiftCardService,
    private discountService: DiscountService) { }

  ngOnInit(): void {
    this.subscribeDiscount();
    this.cartService.getCartData().subscribe((data) => {
      this.cartSession = data;
      this.total_price = this.cartSession.total_price;
      if (this.isDiscount) this.total_price = this.cartSession.total_price - this.cartSession.total_price * 0.25;
    });
    this.total_price = +this.total_price.toFixed(2);
  }

  subscribeDiscount() {
    this.discountService.getisDiscount().subscribe(response => {
      this.isDiscount = response;
    })
  }

  deliveryForm = new FormGroup({
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    zip: new FormControl("", [Validators.required])
  });

  get Address(): FormControl {
    return this.deliveryForm.get("address") as FormControl;
  }

  get City(): FormControl {
    return this.deliveryForm.get("city") as FormControl;
  }

  get Zip(): FormControl {
    return this.deliveryForm.get("zip") as FormControl;
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/atsiskaitymas']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['atsiskaitymas/i-namus']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['atsiskaitymas/i-pastomata']);
  }

  radioButtonChecked0(event: any) {

    if (this.radioButtonSelected != undefined) this.total_price -= +this.radioButtonSelected;
    this.total_price += 0;
    this.radioButtonSelected = event.target.value;
    this.tips = 'none';
  }

  radioButtonChecked05(event: any) {

    if (this.radioButtonSelected != undefined) this.total_price -= +this.radioButtonSelected;
    this.total_price += 0.5;
    this.radioButtonSelected = event.target.value;
    this.tips = 'inline';
  }

  radioButtonChecked1(event: any) {

    if (this.radioButtonSelected != undefined) this.total_price -= +this.radioButtonSelected;
    this.total_price += 1;
    this.radioButtonSelected = event.target.value;
    this.tips = 'inline';
  }

  radioButtonChecked2(event: any) {

    if (this.radioButtonSelected != undefined) this.total_price -= +this.radioButtonSelected;
    this.total_price += 2;
    this.radioButtonSelected = event.target.value;
    this.tips = 'inline';
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
        if (this.radioButtonSelected === undefined) this.radioButtonSelected = "0";
        this.delivery.courierTips = +this.radioButtonSelected;

        this.cartSession.total_price = this.total_price;

        this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "delivery", null!, this.delivery)
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

    if (this.deliveryForm.invalid) {
      this.errors = true;
      return;
    }
    this.errors = false;

    this.authenticationService.getUserByUsername().subscribe(
      data => {
        this.user = data;
        if (this.giftCard != null) {
          if (this.total_price > this.oldBalance) {
            this.pay(this.total_price - this.oldBalance, this.user.email);
          }
          if (this.total_price <= this.oldBalance) {
            if (this.radioButtonSelected === undefined) this.radioButtonSelected = "0";
            this.delivery.courierTips = +this.radioButtonSelected;

            this.cartSession.total_price = this.total_price;

            this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "delivery", null!, this.delivery)
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
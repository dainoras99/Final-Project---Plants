import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftCard } from 'src/app/common/gift-card';
import { GiftCardService } from 'src/app/services/gift-card.service';
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {

  currentSelectionImage: number = 1;
  currentSelectionPrice: number = 25;
  errors: boolean = false;
  giftCard: GiftCard = new GiftCard();
  handler:any = null;


  constructor(private giftCardService: GiftCardService, private router:Router, private titleService: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle("Dovanų kuponai - www.augaluoaze.lt");
    this.meta.updateTag({ name: 'description', content: 'Augalų oazės internetinės prekybos dovanų kuponų puslapis kuriame galite įsigyti kuponų sau arba kitiems žmonėms. Pasirinkite dovanų kuponą tarp 25€, 50€, 75€ arba 100€!' });
    
  }

  giftCardForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    message: new FormControl("", [])
  });

  get Name(): FormControl {
    return this.giftCardForm.get("name") as FormControl;
  }

  get Email(): FormControl {
    return this.giftCardForm.get("email") as FormControl;
  }

  get Message(): FormControl {
    return this.giftCardForm.get("message") as FormControl;
  }

  chosen25(event: any) {
    this.currentSelectionPrice = 25;
  }

  chosen50(event: any) {
    this.currentSelectionPrice = 50;
  }

  chosen75(event: any) {
    this.currentSelectionPrice = 75;
  }

  chosen100(event: any) {
    this.currentSelectionPrice = 100;
  }

  changePicture(forward: boolean) {
      if (forward) {
        if (this.currentSelectionImage == 3) return;
        else this.currentSelectionImage++;
      }
      else {
        if (this.currentSelectionImage == 1) return;
        else this.currentSelectionImage--;
      }
  }

  postGiftCard() {
    if (this.giftCardForm.invalid) {
      this.errors = true;
      return;
    }

    console.log(this.giftCard)

  this.giftCardService.postGiftCard(this.giftCard.name, this.giftCard.message, this.giftCard.email, this.currentSelectionPrice, this.currentSelectionImage)
  .subscribe(
    {
      next: response => {
        this.pay(this.currentSelectionPrice);
        
      },
      error: err => {
        alert(err);
      }
    }
  )
  }

 

   pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      currency: "eur",
      customer_email: "kazkodel@dsadasd.com",
      key: 'pk_test_51MP391DkOj7oXrK7NNq8UqTc7yg0UTaRPQ0wgDIRy4spp367dIUJ1hV7Dv1EYP9NWWu1IoXccISuIZ3wjczbvKuR00LMLfDVXQ',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        alert("Dovanų kupono užsakymas pateiktas!");
        this.router.navigate(['/augalai']);
      }
    });
 
    handler.open({
      name: 'Augalų Oazė',
      description: 'Augalų elektroninė pardutuovė',
      amount: amount * 100,
      email: "dasdasdasd"
    });
 
  }

}

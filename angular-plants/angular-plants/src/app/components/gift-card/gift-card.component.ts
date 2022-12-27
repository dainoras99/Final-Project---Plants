import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiftCard } from 'src/app/common/gift-card';
import { GiftCardService } from 'src/app/services/gift-card.service';

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


  constructor(private giftCardService: GiftCardService, private router:Router) { }

  ngOnInit(): void {}

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
        alert("Dovanų kupono užsakymas pateiktas!");
        this.router.navigate(['/augalai']);
      },
      error: err => {
        alert(err);
      }
    }
  )
  }

}

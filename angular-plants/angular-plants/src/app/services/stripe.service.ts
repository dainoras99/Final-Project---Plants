import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor() { }

  pay(amount: any) {    
 
    let email = window.document.getElementById("email");
    email!.innerHTML = "new value";
    var handler = (<any>window).StripeCheckout.configure({
      currency: "EUR",
      email: "kazkodel@dsadasd.com",
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
      amount: amount * 100
    });
 
  }
}

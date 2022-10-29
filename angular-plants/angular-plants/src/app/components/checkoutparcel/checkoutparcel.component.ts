import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkoutparcel',
  templateUrl: './checkoutparcel.component.html',
  styleUrls: ['./checkoutparcel.component.css']
})
export class CheckoutparcelComponent implements OnInit {
  typeSelected: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/checkout']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['checkout/home']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['checkout/parcel']);
    console.log(this.typeSelected);
  }

  get getTypeSelected() {
    return this.typeSelected;
  }
}

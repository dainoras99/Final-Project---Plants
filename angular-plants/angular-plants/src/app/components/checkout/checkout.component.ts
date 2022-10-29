import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  typeSelected: any;

  checkoutFormGroup!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        
      })
    })
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

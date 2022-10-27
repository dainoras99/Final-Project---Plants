import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  typeSelected: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    console.log(this.typeSelected);
  }

  get getTypeSelected() {
    return this.typeSelected;
  }

}

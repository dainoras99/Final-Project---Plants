import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parcel } from 'src/app/common/parcel';
import { UserItem } from 'src/app/common/user-item';
import { OrderTypesService } from 'src/app/services/order-types.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-checkoutparcel',
  templateUrl: './checkoutparcel.component.html',
  styleUrls: ['./checkoutparcel.component.css']
})
export class CheckoutparcelComponent implements OnInit {
  typeSelected: any;
  selectedProducts: UserItem[] = [];
  selectedTotal!: number;

  parcelList: Parcel[] = [];

  constructor(private router: Router, private userItemsService: UserItemsService,
    private orderTypesService: OrderTypesService) { }

  ngOnInit(): void {
    this.handleParcels();
    this.userItemsService.selectedProducts.subscribe((data) => {
      this.selectedProducts = data;
    });
    this.userItemsService.selectedTotalPrice.subscribe((data) => {
      this.selectedTotal = data;
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
    console.log(this.typeSelected);
  }

  get getTypeSelected() {
    return this.typeSelected;
  }
}

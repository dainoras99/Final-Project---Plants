import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserItem } from 'src/app/common/user-item';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-checkouthome',
  templateUrl: './checkouthome.component.html',
  styleUrls: ['./checkouthome.component.css']
})
export class CheckouthomeComponent implements OnInit {

  typeSelected: any;

  selectedProducts: UserItem[] = [];
  selectedTotal!: number;
  constructor(private router: Router, private userItemsService: UserItemsService) { }

  ngOnInit(): void {
    this.userItemsService.selectedProducts.subscribe((data) => {
      this.selectedProducts = data;
    });
    this.userItemsService.selectedTotalPrice.subscribe((data) => {
      this.selectedTotal = data;
    });
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

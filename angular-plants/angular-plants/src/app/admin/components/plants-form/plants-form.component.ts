import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from 'src/app/common/file-handler';
import { Plant } from 'src/app/common/plant';
import { PlantCategory } from 'src/app/common/plant-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-plants-form',
  templateUrl: './plants-form.component.html',
  styleUrls: ['./plants-form.component.css']
})
export class PlantsFormComponent implements OnInit {

  chosenCategory: string = '';
  plantCategories: PlantCategory[] = [];
  errors: boolean = false;
  errorNewCategory: boolean = false;
  errorNoCategory: boolean = false;
  plant: Plant = new Plant();

  newCategory!: string;
  categoryToPass!: string;

  //
  selectedFile!: File;
  //

  constructor(private productService: ProductService, private domSanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.productService.getPlantCategories().subscribe(data => {
      this.plantCategories = data;
    })
  }

  newPlantForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    fileUpload: new FormControl("", [Validators.required]),
    stock: new FormControl("", [Validators.required])
  });

  get Name(): FormControl {
    return this.newPlantForm.get("name") as FormControl;
  }

  get Price(): FormControl {
    return this.newPlantForm.get("price") as FormControl;
  }

  get Description(): FormControl {
    return this.newPlantForm.get("description") as FormControl;
  }

  get FileUpload(): FormControl {
    return this.newPlantForm.get("fileUpload") as FormControl;
  }

  get Stock(): FormControl {
    return this.newPlantForm.get("stock") as FormControl;
  }


  selectedCategory(event: any) {
    this.chosenCategory = event.target.value;
    this.errorNoCategory = false;
  }

  onFileSelection(event: any) {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
    }
  }

  addPlant() {

    if (this.chosenCategory == '') {
      this.errorNoCategory = true;
      return;
    }
    if (this.chosenCategory == "new") {
      this.errorNewCategory = true;
      this.categoryToPass = this.newCategory;
      if (this.categoryToPass == undefined) return;
    }
    else {
      this.errorNewCategory = false;
      this.categoryToPass = this.chosenCategory;
    }
    if (this.newPlantForm.invalid) {
      this.errors = true;
      return;
    }


    this.errors = false;
    this.errorNewCategory = false;

    //
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.productService.imageUpload(uploadImageData)
      .subscribe((response) => {
        if (response.status === 200) {
         
        } else {

        }
      }
      );
    //

    this.productService.addPlant(this.plant, this.categoryToPass, this.selectedFile.name).subscribe(
      {
        next: response => {
          alert(response);
        },
        error: err => {
          alert(err);
        }
      }
    )

    // this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "shop", this.shopId, null!)
    // .subscribe(
    //   {
    //     next: response => {
    //       alert(response);
    //       this.cartService.setCartData(null!);
    //       this.router.navigate(['/plants']);
    //     },
    //     error: err => {
    //       alert("Svetainės klaida, kreipkitės į administratorių");
    //       this.router.navigate(['/plants']);
    //     }
    //   }
    // );
  }


}

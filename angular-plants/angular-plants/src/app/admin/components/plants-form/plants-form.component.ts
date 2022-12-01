import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plants-form',
  templateUrl: './plants-form.component.html',
  styleUrls: ['./plants-form.component.css']
})
export class PlantsFormComponent implements OnInit {

  chosenCategory: string = "new";

  constructor() { }

  ngOnInit(): void {
  }

  selectedCategory(event: any) {
    this.chosenCategory = event.target.value;
  }

}

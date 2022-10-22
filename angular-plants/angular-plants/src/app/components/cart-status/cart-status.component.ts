import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  constructor(@Inject(AuthenticationService) public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

}

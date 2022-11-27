import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User = new User();
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    
  }

  adminLogin() {
    console.log("DSADASDSADa");
    this.loginService.loginAdmin(this.user).subscribe(
      {
        next: response => {
          localStorage.setItem("username", this.user.username);
          alert("Prisijungimas sėkmingas")
          response = this.user;
          this.loginService.setUserData(this.user.username);
        },
        error: err => {
          alert("ne");
        }
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User = new User();
  loginError: string = "none";
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    
  }

  adminLogin() {
    console.log("DSADASDSADa");
    this.loginService.loginAdmin(this.user).subscribe(
      {
        next: response => {
          this.loginError = "none";
          localStorage.setItem("username", this.user.username);
          response = this.user;
          this.loginService.setUserData(this.user.username);
          this.router.navigateByUrl('/panel');
        },
        error: err => {
          this.loginError = "inline";
        }
      }
    )
  }

}

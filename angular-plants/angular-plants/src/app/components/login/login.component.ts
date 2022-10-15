import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  userLogin() {
    console.log(this.user);
    this.loginService.loginUser(this.user).subscribe(
      {
        next: response => {
          alert("Prisijungimas sėkmingas")
          localStorage.setItem("username", this.user.username);
        },
        error: err => {
          console.log(err);
          alert("negerai");
        }
      }
      )
    }

}

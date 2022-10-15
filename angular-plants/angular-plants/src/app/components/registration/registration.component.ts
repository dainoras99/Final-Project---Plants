import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { RegisterService } from 'src/app/services/register.service';
import { MatDialog } from '@angular/material/dialog'
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  constructor(private registerService: RegisterService, private router: Router, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  userRegister() {
    this.registerService.registerUser(this.user).subscribe(
      {
        next: response => {
          alert("Registracija sėkminga")
        },
        error: err => {
          console.log(err);
          alert("negerai");
        }
      }
    )
  }

  openLoginDialog() {
    this.dialogRef.open(LoginComponent, {
      height: '45%',
      width: '30%'
    });

  }
}
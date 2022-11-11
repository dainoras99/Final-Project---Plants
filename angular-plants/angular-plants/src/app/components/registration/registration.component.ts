import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { RegisterService } from 'src/app/services/register.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { LoginComponent } from '../login/login.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  repeatedPass: string = "none";
  errors: boolean = false;
  userExistError: string = "none";
  constructor(private registerService: RegisterService, private router: Router, 
    private dialogRef: MatDialog, private dialogRefRegistration: MatDialogRef<RegistrationComponent>, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    birthdate: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    repeatedPassword: new FormControl("", [Validators.required])
  });

  get userName(): FormControl {
    return this.registerForm.get("username") as FormControl;
  }

  get firstName(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }

  get lastName(): FormControl {
    return this.registerForm.get("lastname") as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }

  get birthDate(): FormControl {
    return this.registerForm.get("birthdate") as FormControl;
  }

  get passWord(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }

  get RepeatedPassword(): FormControl {
    return this.registerForm.get("repeatedPassword") as FormControl;
  }

  userRegister() {
    if (this.registerForm.invalid) {
      this.errors = true;
      return;
    }
    if (this.passWord.value == this.RepeatedPassword.value) {
      this.userExistError = 'none';
      this.repeatedPass = 'none';
      this.errors = false;
      this.registerService.registerUser(this.user).subscribe(
        {
          next: response => {
            alert("Registracija sėkminga!")
            this.openLoginDialog();
          },
          error: err => {
            this.userExistError = "inline";
          }
        }
      )
    }
    else {
      this.repeatedPass = 'inline';
      this.errors = true;
    }
  }

  openLoginDialog() {
    this.dialogRefRegistration.close();
    this.dialogRef.open(LoginComponent, {
      height: '45%',
      width: '30%'
    });
  }
}
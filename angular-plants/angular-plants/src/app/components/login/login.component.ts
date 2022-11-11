import { Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loginError: string = "none";

  constructor(private loginService: LoginService, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.loginError = "none";
  }

  
  userLogin() {
    console.log(this.user);
    this.loginService.loginUser(this.user).subscribe(
      {
        next: response => {
          this.loginError = "none";
          alert("Prisijungimas sėkmingas")
          localStorage.setItem("username", this.user.username);
          this.dialogRef.close();
        },
        error: err => {
          this.loginError = "inline";
        }
      }
    )
  }

  closeModal() {
    this.dialogRef.close();
  }

  // ngAfterViewInit() {
  //   console.log(this.closeModal.nativeElement); // throws an error
  // }

}

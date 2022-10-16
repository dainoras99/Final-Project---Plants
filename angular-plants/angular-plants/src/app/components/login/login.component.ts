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
  // @ViewChild('closeLoginModal',{static: false}) closeModal!: ElementRef;

  constructor(private loginService: LoginService, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  
  userLogin() {
    console.log(this.user);
    this.loginService.loginUser(this.user).subscribe(
      {
        next: response => {
          
          alert("Prisijungimas sėkmingas")
          localStorage.setItem("username", this.user.username);
          this.dialogRef.close();
          // console.log(this.closeModal.nativeElement);
          // this.closeModal.nativeElement.click()
        },
        error: err => {
          console.log(err);
          alert("negerai");
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

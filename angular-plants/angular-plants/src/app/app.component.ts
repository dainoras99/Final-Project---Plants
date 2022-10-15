import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-plants';

  constructor(private dialogRef: MatDialog) {}

  openDialog() {
    this.dialogRef.open(RegistrationComponent, {
      height: '80%',
      width: '60%'
    });
  }

  openLoginDialog() {
    this.dialogRef.open(LoginComponent, {
      height: '45%',
      width: '30%'
    });
  }
}

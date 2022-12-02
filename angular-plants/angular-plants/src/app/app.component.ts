import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationService } from './services/authentication.service';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showSearchResults = true;
  subscription: Subscription;
  pageReloading: boolean = false;

  constructor(private dialogRef: MatDialog,
     public authenticationService: AuthenticationService, 
     private sideNavService: SidenavService,
     private router: Router) {
      this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.pageReloading = !router.navigated;
          if (this.pageReloading) {
            localStorage.clear();
          }
        }
    });
  }

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

  refreshSearchResults() {
    this.showSearchResults = false;
    setTimeout(() => this.showSearchResults = true);
  }
}

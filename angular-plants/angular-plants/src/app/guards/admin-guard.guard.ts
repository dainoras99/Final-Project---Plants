import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserItemsService } from '../services/user-items.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {


  constructor(private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): boolean {
    // this.authService.
    return false;
  }
  
}

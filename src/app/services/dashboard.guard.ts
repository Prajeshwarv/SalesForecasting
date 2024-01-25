import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DashboardLoadService } from './dashboard-load.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private dashboardLoadService: DashboardLoadService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isSignedIn()) {
        if(this.dashboardLoadService.isUploaded == true) return true;
        else return this.router.navigateByUrl('/upload');
      } else return this.router.navigateByUrl('/signin');
  }
  
}

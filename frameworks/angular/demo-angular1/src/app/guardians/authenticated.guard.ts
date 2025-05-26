import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "../services/security.service";

@Injectable({
    providedIn: "root",
})
export class AuthenticatedGuard implements CanActivate {
    constructor(private securityService: SecurityService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.securityService.existSession()) {
            this.router.navigate(["/dashboard"]);
            return true;
        } else {
            return false;
        }
    }
}

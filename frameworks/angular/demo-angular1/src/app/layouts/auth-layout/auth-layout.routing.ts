import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { NoAuthenticatedGuard } from "src/app/guardians/no-authenticated.guard";

export const AuthLayoutRoutes: Routes = [
    { path: "login", component: LoginComponent, canActivate: [NoAuthenticatedGuard] },
    { path: "register", component: RegisterComponent, canActivate: [NoAuthenticatedGuard] },
];

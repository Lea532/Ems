import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {KeycloakAuthGuard} from "keycloak-angular";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "../security/auth.guard";

export const routes: Routes = [
  { path: 'dashboard', component: EmployeeListComponent, canActivate: [AuthGuard]},//, canActivate: [KeycloakAuthGuard]
  { path: '', component: HomeComponent },
];

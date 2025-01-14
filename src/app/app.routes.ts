import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "../security/auth.guard";
import {OverviewComponent} from "./components/overview/overview.component";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {DetailpageEmployeeComponent} from "./components/detailpage-employee/detailpage-employee.component";

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},//, canActivate: [KeycloakAuthGuard]
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard]},
  { path: 'employees/:id', component: DetailpageEmployeeComponent, canActivate: [AuthGuard]},
  { path: '', component: HomeComponent },
];

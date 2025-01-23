import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "../security/auth.guard";
import {OverviewComponent} from "./components/overview/overview.component";
import {DetailpageEmployeeComponent} from "./components/detailpage-employee/detailpage-employee.component";
import {
  DetailpageQualificationComponent
} from "./components/detailpage-qualification/detailpage-qualification.component";

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
  { path: 'employees/:id', component: DetailpageEmployeeComponent, canActivate: [AuthGuard]},
  { path: 'qualification/:id', component: DetailpageQualificationComponent, canActivate: [AuthGuard]},
  { path: '', component: HomeComponent },
];

import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "../security/auth.guard";
import {OverviewComponent} from "./components/overview/overview.component";

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},//, canActivate: [KeycloakAuthGuard]
  { path: '', component: HomeComponent },
];

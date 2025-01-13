import {Component, OnInit} from '@angular/core';
import {Employee} from "../../model/Employee";
import {Qualification} from "../../model/Qualification";
import {EmployeeApiService} from "../../services/employee-api.service";
import {QualificationApiService} from "../../services/qualification-api.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  protected employees$!: Observable<Employee[]>;
  protected qualifications$!: Observable<Qualification[]>;

  constructor(
    private employeeApiService: EmployeeApiService,
    private qualificationApiService: QualificationApiService,
    private keycloak: KeycloakService,

  ) {
  }

  ngOnInit() {
   this.employeeApiService.getAllEmployees().then(result => {
     this.employees$ = result;
   }) .catch((error) => {
     console.error('Error:', error);
   });
    this.qualificationApiService.getAllQualifications().then(result => {
      this.qualifications$ = result;
    }).catch((error) => {
      console.error('Error:', error);
    })
  }

  logout(){
    this.keycloak.logout();
  }
}

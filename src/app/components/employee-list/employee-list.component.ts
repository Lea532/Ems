import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../../Employee";
import {EmployeeApiService} from "../../services/employee-api.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private employeeApiService: EmployeeApiService, private keycloak: KeycloakService) {
    this.employees$ = new Observable<Employee[]>()
  }

  employees$: Observable<Employee[]>;

  async ngOnInit() {
    this.employees$ = await this.employeeApiService.getAllEmployees();
  }

  logout(){
    this.keycloak.logout();
  }

}

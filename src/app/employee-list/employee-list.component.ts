import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {EmployeeApiService} from "../services/employee-api.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private employeeApiService: EmployeeApiService) {
    this.employees$ = new Observable<Employee[]>()
  }

  employees$: Observable<Employee[]>;

  ngOnInit() {
    this.employees$ = this.employeeApiService.getAllEmployees();
  }

}

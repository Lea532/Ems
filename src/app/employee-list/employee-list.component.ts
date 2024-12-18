import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {EmployeeApiService} from "../services/employee-api.service";
import {MaterialModule} from "../material/material.module";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
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

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DeleteDialogComponent);
  }
}

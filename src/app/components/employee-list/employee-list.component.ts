import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {Employee} from "../../model/Employee";
import {EmployeeApiService} from "../../services/employee-api.service";
import {KeycloakService} from "keycloak-angular";

import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";
import {MaterialModule} from "../../material/material.module";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
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

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log('Löschen wurde bestätigt.');
      } else {
        console.log('Löschen wurde abgebrochen.');
      }
    });
  }

}

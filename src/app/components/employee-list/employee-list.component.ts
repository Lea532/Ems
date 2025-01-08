import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {Employee} from "../../Employee";
import {EmployeeApiService} from "../../services/employee-api.service";
import {KeycloakService} from "keycloak-angular";

import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";
import {MaterialModule} from "../../material/material.module";
import {AddEditEmployeeDialogComponent} from "../dialogs/add-edit-employee-dialog/add-edit-employee-dialog.component";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";

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

  logout(){
    this.keycloak.logout();
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      data: { id: 0 },
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      data: { id: 1 },
    });
  }
  showEmployeeDetails(id: number | undefined) {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      data: {id},
    });
  }
}

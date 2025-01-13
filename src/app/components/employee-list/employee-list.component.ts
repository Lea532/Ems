import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {Employee} from "../../model/Employee";
import {EmployeeApiService} from "../../services/employee-api.service";
import {KeycloakService} from "keycloak-angular";

import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {MaterialModule} from "../../material/material.module";
import {AddEditEmployeeDialogComponent} from "../dialogs/add-edit-employee-dialog/add-edit-employee-dialog.component";
import {EmployeeDetailComponent} from "../dialogs/employee-detail/employee-detail.component";
import {Qualification} from "../../model/Qualification";
import {QualificationApiService} from "../../services/qualification-api.service";
import {QualificationDetailComponent} from "../qualification-detail/qualification-detail.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private employeeApiService: EmployeeApiService, private keycloak: KeycloakService, private qualificationApiService: QualificationApiService) {
    this.employees$ = new Observable<Employee[]>()
    this.qualifications$ = new Observable<Qualification[]>()
  }

  employees$: Observable<Employee[]>;
  qualifications$: Observable<Qualification[]>;

  async ngOnInit() {
    this.employees$ = await this.employeeApiService.getAllEmployees();
    this.qualifications$ = await this.qualificationApiService.getAllQualifications()
  }

  readonly dialog = inject(MatDialog);

  openDeleteDialog(id:number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.employeeApiService.deleteEmployeeById(id)
          .then(r => this.ngOnInit())
          .catch(error => { console.log(error); });
      } else {
        console.log('Löschen wurde abgebrochen.');
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      data: { id: 0 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    })
  }

  openEditDialog(id:number): void {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    })
  }
  showEmployeeDetails(id: number | undefined) {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      data: {id},
    });
  }

  showQualificationDetails(id: number) {
    const dialogRef = this.dialog.open(QualificationDetailComponent, {
      data: {id},
    });
  }
}

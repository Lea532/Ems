import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {Employee} from "../../Employee";
import {EmployeeApiService} from "../../services/employee-api.service";
import {KeycloakService} from "keycloak-angular";

import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";
import {MaterialModule} from "../../material/material.module";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
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

import {Component, inject, OnInit} from '@angular/core';

import {EmployeeApiService} from "../../services/employee-api.service";
import {QualificationApiService} from "../../services/qualification-api.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {KeycloakService} from "keycloak-angular";
import {Employee} from "../../models/employee";
import {Qualification} from "../../models/Qualification";
import {MatButtonModule} from "@angular/material/button";
import {
  AddEditQualificationDialogComponent
} from "../dialogs/add-edit-qualification-dialog/add-edit-qualification-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddEditEmployeeDialogComponent} from "../dialogs/add-edit-employee-dialog/add-edit-employee-dialog.component";
import {Router} from "@angular/router";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {QualificationDetailComponent} from "../qualification-detail/qualification-detail.component";
import {SearchEmployeeComponent} from "../search-employee/search-employee.component";
import {SearchQualificationComponent} from "../search-qualification/search-qualification.component";
// import * as module from "node:module";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    SearchEmployeeComponent,
    SearchQualificationComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  protected employees$!: Observable<Employee[]>;
  protected qualifications$!: Observable<Qualification[]>;
  protected filteredEmployees: Employee[] = [];
  protected filteredQualifications: Qualification[] = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private employeeApiService: EmployeeApiService,
    private qualificationApiService: QualificationApiService,
    private keycloak: KeycloakService,
    private router: Router
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
  onFilteredEmployees(filteredEmployees: Employee[]) {
    this.filteredEmployees = filteredEmployees;
  }

  onFilteredQualifications(filteredQualifications: Qualification[]) {
    this.filteredQualifications = filteredQualifications;
  }

  logout(){
    this.keycloak.logout();
  }

  addOrEditQualification(qualification: Qualification|null) {
    const dialogRef = this.dialog.open(AddEditQualificationDialogComponent, {
      data: { qualification: qualification }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  openEmployeeDeleteDialog(id:number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.employeeApiService.deleteEmployeeById(id)
          .then(() => this.ngOnInit())
          .catch(error => { console.log(error); });
      } else {
        console.log('Löschen wurde abgebrochen.');
      }
    });
  }

  addOrEditEmployee(employee: Employee|null): void {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      data: { employee: employee },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  showQualificationDetails(id: number) {
    this.router.navigate(['/qualification', id]);
  }

  navToEmployeeDetailpage(id: number) {
    this.router.navigate(['/employees', id]);
  }

  openDeleteDialog(id:number) {
    const dialogRef = this.dialog.open(QualificationDetailComponent, {
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  //protected readonly events = module
}

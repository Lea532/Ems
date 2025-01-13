import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MaterialModule} from "../../../material/material.module";
import {Qualification} from "../../../model/Qualification";
import {EmployeeApiService} from "../../../services/employee-api.service";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit{
  qualifications: Qualification[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private employeeApiService: EmployeeApiService
  ) {}

  async ngOnInit() {
    if (this.data.id) {
      try {
        const observable = await this.employeeApiService.getAllQualificationsOfEmployeeById(this.data.id);
        observable.subscribe((employeeWithQualifications) => {
          this.qualifications = employeeWithQualifications.skillSet;
          console.log(1, employeeWithQualifications.skillSet);
        });
      } catch (error) {
        console.error('Fehler beim Abrufen der Qualifikationen:', error);
      }
    }
  }
}

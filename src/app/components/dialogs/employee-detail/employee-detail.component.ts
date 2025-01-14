import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MaterialModule} from "../../../material/material.module";
import {Qualification} from "../../../models/Qualification";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EmployeeApiService} from "../../../services/employee-api.service";
import {QualificationGetDto} from "../../../models/QualificationGetDto";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit{
  qualifications: QualificationGetDto[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private employeeApiService: EmployeeApiService
  ) {}

  async ngOnInit() {
    if (this.data.id) {
      try {
        let employee = await this.employeeApiService.getEmployeeById(this.data.id);
        employee.subscribe(s => {
          this.qualifications = s.skillSet!;
        })
      } catch (error) {
        console.error('Fehler beim Abrufen der Qualifikationen:', error);
      }
    }
  }
}

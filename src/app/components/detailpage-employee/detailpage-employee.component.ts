import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {EmployeeApiService} from "../../services/employee-api.service";
import {Observable} from "rxjs";
import {Employee} from "../../models/employee";
import {ActivatedRoute} from "@angular/router";
import {Qualification} from "../../models/Qualification";

@Component({
  selector: 'app-detailpage-employee',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './detailpage-employee.component.html',
  styleUrl: './detailpage-employee.component.css'
})
export class DetailpageEmployeeComponent implements OnInit{
  employee$: Observable<Employee>;
  public id: number = 0;

  constructor(private employeeApiService: EmployeeApiService, private route: ActivatedRoute) {
    this.employee$ = new Observable<Employee>()
  }

  async ngOnInit() {
    try {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.employee$ = await this.employeeApiService.getEmployeeById(this.id)
    } catch (error) {
      console.error('Fehler beim Abrufen des Mitarbeiters:', error);
    }
  }

  deleteSkillOfEmployee(qualification: Qualification) {
    this.employeeApiService.deleteQualificationById(this.id, qualification).then(r => this.ngOnInit())
  }
}

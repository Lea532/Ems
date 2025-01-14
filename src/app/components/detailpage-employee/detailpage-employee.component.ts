import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {EmployeeApiService} from "../../services/employee-api.service";
import {Observable} from "rxjs";
import {Employee} from "../../models/employee";
import {ActivatedRoute} from "@angular/router";
import {Qualification} from "../../models/Qualification";
import {QualificationApiService} from "../../services/qualification-api.service";
import {FormControl, FormGroup} from "@angular/forms";

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
  public allQualifications: Qualification[] = [];
  form = new FormGroup({
    skillSet: new FormControl<number[]>([])
  })

  constructor(private employeeApiService: EmployeeApiService, private route: ActivatedRoute, private qualificationApiService: QualificationApiService) {
    this.employee$ = new Observable<Employee>()
  }

  async ngOnInit() {
    try {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.employee$ = await this.employeeApiService.getEmployeeById(this.id);

      (await this.qualificationApiService.getAllQualifications()).subscribe(qualifications => {
        this.allQualifications = qualifications;
        console.log(1, this.allQualifications)
      });
    } catch (error) {
      console.error('Fehler beim Abrufen des Mitarbeiters:', error);
    }
  }

  deleteSkillOfEmployee(qualification: Qualification) {
    this.employeeApiService.deleteQualificationById(this.id, qualification).then(r => this.ngOnInit())
  }

  addQualifications() {
    this.form.controls.skillSet.value?.forEach((qualificationId) => {
      this.employeeApiService.addQualificationToEmployee(this.id, this.findQualificationById(qualificationId)).then(x => this.ngOnInit());
    })
  }

  private findQualificationById(qualificationId: number): Qualification {
    let qualificationForReturn: Qualification;
    this.allQualifications.forEach(qualification => {
      if (qualification.id === qualificationId) {
        qualificationForReturn = qualification;
      }
    })
    return qualificationForReturn!;
  }
}

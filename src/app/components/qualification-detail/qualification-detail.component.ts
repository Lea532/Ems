import {Component, Inject} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {QualificationApiService} from "../../services/qualification-api.service";
import {EmployeeNameAndSkillDataDto} from "../../models/EmployeeNameAndSkillDataDto";
import {GetQualificationWithEmployees} from "../../models/GetQualificationWithEmployees";

@Component({
  selector: 'app-qualification-detail',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './qualification-detail.component.html',
  styleUrl: './qualification-detail.component.css'
})
export class QualificationDetailComponent {
  employees: EmployeeNameAndSkillDataDto[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private qualificationApiService: QualificationApiService
  ) {}

  async ngOnInit() {
    if (this.data.id) {
      try {
        const observable = await this.qualificationApiService.getAllEmployeesByQualificationId(this.data.id);
        observable.subscribe((qualificationWithEmployees: GetQualificationWithEmployees) => {
          this.employees = qualificationWithEmployees.employees;
        });
      } catch (error) {
        console.error('Fehler beim Abrufen der Mitarbeiter:', error);
      }
    }
  }
}

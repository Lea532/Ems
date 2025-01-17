import {Component, inject, Inject} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QualificationApiService} from "../../services/qualification-api.service";
import {EmployeeNameAndSkillDataDto} from "../../models/EmployeeNameAndSkillDataDto";
import {GetQualificationWithEmployees} from "../../models/GetQualificationWithEmployees";
import {EmployeeApiService} from "../../services/employee-api.service";

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
  readonly dialogRef = inject(MatDialogRef<QualificationDetailComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private qualificationApiService: QualificationApiService,
    private employeeApiService: EmployeeApiService,
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

  async deleteQualificationOfEmployees() {
    for (const employee of this.employees) {
      await this.employeeApiService.deleteQualificationById(employee.id, this.data.id)
    }
    this.qualificationApiService.deleteQualification(this.data.id)
    this.dialogRef.close()
  }
}

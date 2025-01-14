import {Component, inject, OnInit} from '@angular/core';
import {Employee} from "../../../model/Employee";
import {EmployeeApiService} from "../../../services/employee-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Qualification} from "../../../models/Qualification";
import {MaterialModule} from "../../../material/material.module";
import {QualificationApiService} from "../../../services/qualification-api.service";
import {AddEmployeeDto} from "../../../models/AddEmployeeDto";

@Component({
  selector: 'app-add-edit-employee-dialog',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './add-edit-employee-dialog.component.html',
  styleUrl: './add-edit-employee-dialog.component.css'
})
export class AddEditEmployeeDialogComponent implements OnInit{
  public employee: Employee;
  public allQualifications: Qualification[] = [];
  public employeeQualifications: Qualification[] = [];
  readonly dialogRef = inject(MatDialogRef<AddEditEmployeeDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  public formGroup = new FormGroup({
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    skillSet: new FormControl<number[]>([])
  })

  constructor(private employeeApiService: EmployeeApiService, private qualificationApiService: QualificationApiService) {
    this.employee = new Employee();
  }

  private getQualificationListAsIdList(qualifications: Qualification[]): number[] {
    let idList: number[] = [];
    qualifications.forEach(qualification => {
      idList.push(qualification.id);
    })
    return idList;
  }

  async ngOnInit() {
    await this.fillFormGroup();
    (await this.qualificationApiService.getAllQualifications()).subscribe(qualifications => {
      this.allQualifications = qualifications;
      console.log(1, this.allQualifications)
    })
  }

  private async fillFormGroup() {
    if (this.data.id != 0) {
      (await this.employeeApiService.getEmployeeById(this.data.id)).subscribe(employee => {
        this.employee = employee;
        this.formGroup.controls.firstname.setValue(this.employee.firstName!);
        this.formGroup.controls.lastname.setValue(this.employee.lastName!);
        this.formGroup.controls.street.setValue(this.employee.street!);
        this.formGroup.controls.postcode.setValue(this.employee.postcode!);
        this.formGroup.controls.city.setValue(this.employee.city!);
        this.formGroup.controls.phone.setValue(this.employee.phone!);
        this.formGroup.controls.skillSet.setValue(this.getQualificationListAsIdList(this.employee.skillSet!));

        this.employeeQualifications = this.employee.skillSet!;
      });
    }
  }

  private getFormData() {
    let firstname = this.formGroup.controls.firstname.value!;
    let lastname = this.formGroup.controls.lastname.value!;
    let street = this.formGroup.controls.street.value!;
    let postcode = this.formGroup.controls.postcode.value!;
    let city = this.formGroup.controls.city.value!;
    let phone = this.formGroup.controls.phone.value!;
    let skills = this.formGroup.controls.skillSet.value!;

    return {firstname, lastname, street, postcode, city, phone, skills};
  }

  deleteQualification(qualification:Qualification) {
    this.employeeQualifications = this.employeeQualifications.filter(filterQualification => filterQualification.id != qualification.id);
    this.employeeApiService.deleteQualificationById(this.data.id, qualification);
    let skillIds: number[] = [];
    this.employeeQualifications.forEach(qualification => {
      skillIds.push(qualification.id);
    })
    this.formGroup.controls.skillSet.setValue(skillIds);
  }

  async addOrEditEmployee(isAdd: boolean) {
    if (this.formGroup.valid) {
      let {firstname, lastname, street, postcode, city, phone, skills} = this.getFormData();
      skills.push(...this.getQualificationListAsIdList(this.employeeQualifications));
      let addEmployee: AddEmployeeDto = new AddEmployeeDto(firstname, lastname, street, postcode, city, phone, skills);
      console.log("add",addEmployee);
      if(isAdd){
        (await this.employeeApiService.addEmployee(addEmployee)).subscribe(employee => {
          this.dialogRef.close(employee);
        });
      } else {
        await this.employeeApiService.editEmployee(this.data.id, addEmployee);
        this.dialogRef.close();
      }
    } else {
      alert("Es muss alles ausgefüllt sein.")
    }
  }
}

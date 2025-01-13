import {Component, inject, OnInit} from '@angular/core';
import {Employee} from "../../../models/Employee";
import {EmployeeApiService} from "../../../services/employee-api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Qualification} from "../../../models/Qualification";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../../../material/material.module";
import {QualificationApiService} from "../../../services/qualification-api.service";
import {AddEmployeeDto} from "../../../model/AddEmployeeDto";

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
  public selectedQualificaton: Qualification|null = null;
  public allQualificatons: Qualification[] = [];
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
    skillset: new FormControl<number[]>([])
  })

  constructor(private employeeApiService: EmployeeApiService, private qualificatoinApiServie: QualificationApiService) {
    this.employee = new Employee();
  }

  async ngOnInit() {
    await this.fillFormGroup();
    (await this.qualificatoinApiServie.getAllQualifications()).subscribe(qualifications => {
      this.allQualificatons = qualifications;
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
      });
    }
  }

  async addEmployee() {
    if(this.formGroup.valid){
      let firstname = this.formGroup.controls.firstname.value!;
      let lastname = this.formGroup.controls.lastname.value!;
      let street = this.formGroup.controls.street.value!;
      let postcode = this.formGroup.controls.postcode.value!;
      let city = this.formGroup.controls.city.value!;
      let phone = this.formGroup.controls.phone.value!;
      let skills = this.formGroup.controls.skillset.value!;
      let skillset: number[] = [];
      skills.forEach(skill => {
        skillset.push(Number(skill));
      })
      let addEmployee: AddEmployeeDto = new AddEmployeeDto(firstname, lastname, street, postcode, city, phone, skillset);

      (await this.employeeApiService.addEmployee(addEmployee)).subscribe(employee => {
        this.dialogRef.close(employee);
      });
    } else {
      alert("Es muss alles ausgefüllt sein.")
    }
  }

  editEmployee() {

  }
}

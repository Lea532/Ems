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

@Component({
  selector: 'app-add-edit-employee-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
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
    street: new FormControl(''),
    postcode: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl('')
  })

  constructor(private employeeApiService: EmployeeApiService) {
    this.employee = new Employee();
  }

  async ngOnInit() {
    if(this.data.id != 0){
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
}

import {Component, inject, isStandalone, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QualificationApiService} from "../../../services/qualification-api.service";
import {Qualification} from "../../../models/Qualification";
import {AddQualificationDto} from "../../../models/AddQualificationDto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-add-edit-qualification-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './add-edit-qualification-dialog.component.html',
  styleUrl: './add-edit-qualification-dialog.component.css'
})
export class AddEditQualificationDialogComponent implements OnInit{
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<AddEditQualificationDialogComponent>);
  private qualification!: Qualification;
  public qualificationTitle: string = "";

  constructor(private qualificationApiService: QualificationApiService) {
  }

  async ngOnInit(){
    if(this.data.qualification){
      this.qualification = this.data.qualification;
      this.qualificationTitle = this.data.qualification.skill;
    }
  }

  async addOrEditQualification(isAdd: boolean) {
    if (this.qualificationTitle == "") {
      alert("Der Name muss ausgefüllt sein.")
    } else {
      let qualificationToSave: AddQualificationDto = new AddQualificationDto(this.qualificationTitle)
      if (isAdd) {
        (await this.qualificationApiService.addQualification(qualificationToSave)).subscribe(response => {
          this.dialogRef.close();
        })
      } else {
        (await this.qualificationApiService.editQualification(this.qualification.id, qualificationToSave)).subscribe(response => {
          this.dialogRef.close();
        })
      }
    }
  }

  protected readonly isStandalone = isStandalone;
}

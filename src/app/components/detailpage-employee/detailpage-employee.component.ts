import {Component, inject, OnInit} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {EmployeeApiService} from "../../services/employee-api.service";
import {Observable} from "rxjs";
import {Employee} from "../../models/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {Qualification} from "../../models/Qualification";
import {QualificationApiService} from "../../services/qualification-api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AddQualificationDto} from "../../models/AddQualificationDto";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-detailpage-employee',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './detailpage-employee.component.html',
  styleUrl: './detailpage-employee.component.css'
})
export class DetailpageEmployeeComponent implements OnInit{
  employee$: Observable<Employee>;
  public eid: number = 0;
  public allQualifications: Qualification[] = [];
  readonly dialog = inject(MatDialog);
  form = new FormGroup({
    skillSet: new FormControl<string[]>([])
  })

  constructor(private employeeApiService: EmployeeApiService, private route: ActivatedRoute, private qualificationApiService: QualificationApiService, private router: Router) {
    this.employee$ = new Observable<Employee>()
  }

  async ngOnInit() {
    try {
      this.eid = Number(this.route.snapshot.paramMap.get('id'));
      this.employee$ = await this.employeeApiService.getEmployeeById(this.eid);

      (await this.qualificationApiService.getAllQualifications()).subscribe(qualifications => {
        this.allQualifications = qualifications;
      });
    } catch (error) {
      console.error('Fehler beim Abrufen des Mitarbeiters:', error);
    }
  }

  deleteSkillOfEmployee(qid: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.employeeApiService.deleteQualificationById(this.eid, qid).then(r => this.ngOnInit())
      } else {
        console.log('Löschen wurde abgebrochen.');
      }
    });

  }

  addQualifications() {
    this.form.controls.skillSet.value?.forEach(async (qualificationName:string) => {
      let addQualification: AddQualificationDto = new AddQualificationDto(qualificationName);
      (this.employeeApiService.addQualificationToEmployee(this.eid, addQualification)).then(x => {
        x.subscribe(y => {
          this.ngOnInit();
        });
      });
    })
  }

  navToOverview() {
    this.router.navigate(['overview'])
  }
}

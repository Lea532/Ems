import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {QualificationApiService} from "../../services/qualification-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetQualificationWithEmployees} from "../../models/GetQualificationWithEmployees";
import {Observable} from "rxjs";

@Component({
  selector: 'app-detailpage-qualification',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './detailpage-qualification.component.html',
  styleUrl: './detailpage-qualification.component.css'
})
export class DetailpageQualificationComponent implements OnInit {
  public qualification$: Observable<GetQualificationWithEmployees>;
  public id: number = 0;

  constructor(private qualificationApiService: QualificationApiService, private route: ActivatedRoute, private router: Router) {
    this.qualification$ = new Observable<GetQualificationWithEmployees>()
  }

  async ngOnInit() {
    try {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.qualification$ =  await this.qualificationApiService.getAllEmployeesByQualificationId(this.id)
    } catch (error) {
      console.error('Fehler beim Abrufen der Qualifikation:', error);
    }
  }

  navToOverview(){
    this.router.navigate(['overview']);
  }
}

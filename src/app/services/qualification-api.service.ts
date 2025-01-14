import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";

import {Observable} from "rxjs";
import {GetQualificationWithEmployees} from "../models/GetQualificationWithEmployees";
import {Qualification} from "../models/Qualification";
import {AddQualificationDto} from "../models/AddQualificationDto";


@Injectable({
  providedIn: 'root'
})
export class QualificationApiService {
  constructor(private http: HttpClient, private keyCloakService: KeycloakService) { }

  async authorize(){
    return await this.keyCloakService.getToken();
  }

  async getAllEmployeesByQualificationId(id: number) {
    return this.http.get<GetQualificationWithEmployees>(`http://localhost:8089/qualifications/${id}/employees`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    });
  }

  async getAllQualifications(): Promise<Observable<Qualification[]>> {
    return this.http.get<Qualification[]>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)})
  }

  async addQualification(qualificationToSave: AddQualificationDto) {
    return this.http.post<Qualification>('http://localhost:8089/qualifications', qualificationToSave, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    })
  }

  async editQualification(id:number, qualificationToSave: AddQualificationDto) {
    return this.http.put<Qualification>('http://localhost:8089/qualifications/' + id, qualificationToSave, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    })
  }
}

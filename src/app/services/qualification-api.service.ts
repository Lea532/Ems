import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Qualification} from "../model/Qualification";
import {Employee} from "../model/Employee";
import {Observable} from "rxjs";
import {GetQualificationWithEmployees} from "../model/GetQualificationWithEmployees";

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
}

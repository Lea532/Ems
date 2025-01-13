import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Employee} from "../Employee";
import {Qualification} from "../model/Qualification";

@Injectable({
  providedIn: 'root'
})
export class QualificationApiService {
  constructor(private http: HttpClient, private keyCloakService: KeycloakService) { }

  async authorize(){
    return await this.keyCloakService.getToken();
  }

  async getAllQualifications() {
    return this.http.get<Qualification[]>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${await this.authorize()}`)
    })
  }

  async getAllEmployeesByQualificationId(id: number) {
    return this.http.get<Employee[]>(`http://localhost:8089/qualifications/${id}/employees`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Employee} from "../models/Employee";
import {KeycloakService} from "keycloak-angular";
import {Qualification} from "../model/Qualification";

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  constructor(private http: HttpClient, private keyCloakService: KeycloakService) { }

  async authorize(){
    return await this.keyCloakService.getToken();
  }

  async getAllEmployees() {
    return this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    });
  }

  async getEmployeeById(id: number): Promise<Observable<Employee>> {
    return this.http.get<Employee>('http://localhost:8089/employees/' + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    });
  }

  async getAllQualificationsOfEmployeeById(id: number) {
    return this.http.get<Qualification[]>('http://localhost:8089/employees/' + id + '/qualifications', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${await this.authorize()}`)
    });
  }

  async addEmployee(employee: Employee) {
    return this.http.post<Employee>('http://localhost:8089/employees', employee, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${await this.authorize()}`)
    })
  }

  async addQualificationToEmployee(employeeId: number, qualification: Qualification) {
    return this.http.post<Employee>('http://localhost:8089/employees/' + employeeId + '/qualifications', qualification, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${await this.authorize()}`)
    })
  }
}

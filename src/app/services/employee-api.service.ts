import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Employee} from "../models/Employee";
import {KeycloakService} from "keycloak-angular";
import {Qualification} from "../models/Qualification";
import {AddEmployeeDto} from "../models/AddEmployeeDto";
import {EmployeeResponseDto} from "../models/EmployeeResponseDto";

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

  async addEmployee(addEmployee: AddEmployeeDto) {
    return this.http.post<EmployeeResponseDto>('http://localhost:8089/employees', addEmployee, {
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

  async deleteEmployeeById(employeeId: number) {
    return this.http.delete('http://localhost:8089/employees/' + employeeId, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${await this.authorize()}`)
    }).toPromise();
  }

  async editEmployee(employeeId:number, addEmployee: AddEmployeeDto) {
    return this.http.put('http://localhost:8089/employees/' + employeeId, addEmployee, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${await this.authorize()}`)
    }).toPromise();
  }

  async deleteQualificationById(id: number, qualification: Qualification) {
    return this.http.delete('http://localhost:8089/employees/' + id + '/qualifications/', {
      body: {skill: qualification.skill},
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    })
  }
}

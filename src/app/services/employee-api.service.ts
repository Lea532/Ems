import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

import {KeycloakService} from "keycloak-angular";
import {Employee} from "../models/employee";
import {GetEmployeeWithQualificationsDto} from "../models/GetEmployeeWithQualificationsDto";
import {AddEmployeeDto} from "../models/AddEmployeeDto";
import {EmployeeResponseDto} from "../models/EmployeeResponseDto";
import {Qualification} from "../models/Qualification";
import {AddQualificationDto} from "../models/AddQualificationDto";



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
    return this.http.get<GetEmployeeWithQualificationsDto>('http://localhost:8089/employees/' + id + '/qualifications', {
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

  async addQualificationToEmployee(id: number, qualification: AddQualificationDto) {
    console.log("test123", id, qualification)
    return this.http.post<GetEmployeeWithQualificationsDto>('http://localhost:8089/employees/' + id + '/qualifications', qualification, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    });
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

  async deleteQualificationById(eid: number, qid: number) {
    return this.http.delete('http://localhost:8089/employees/' + eid + '/qualifications/' + qid, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${await this.authorize()}`)
    }).toPromise()
  }
}

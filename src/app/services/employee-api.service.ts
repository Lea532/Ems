import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs";
import {Employee} from "../Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzQ1MjM4MzgsImlhdCI6MTczNDUyMDIzOCwianRpIjoiYzAxMTdjNDYtZmM2ZC00YjNmLThhMjMtZmJhOTg1YWM1YTY0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIxN2Y3OThjZi05YjlhLTQ5OGUtOTc0NC05YTc1ZWY3NGFlNDYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.T4rZoakLBXWS8ko51yO6NKmeBC10jrH56LAQPncwQqL74e5zb5NuG-kwjSqPGK3D_uzxuMLvPkfwgfcCLbIqHZZ7zl9eAKnS7Sb4ieY8lBQanVF1_5iA9zyYcxbStSpkDAwD8kFfm4a6xoQ2qrzgW6mSz48es4RvOaQUpcunRGPgZ1KtHueus_opfmfZUkSy8ew7_xwSSMItkksOveyX2gTeZ2veXgjPxo5xw7rBq4kLOp-qYlFxeVDsj3Q-aacNQCPYGvPFBlGCvWrxnbY4I3HqWVWcnhB-_9RpqntLDQyFvBdcmkeOGnXH42En05pEu0jUyh-3bvqc1n3LPknZGw';

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get<Employee[]>('/backend/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}

import {QualificationGetDto} from "./QualificationGetDto";

export class Employee {
  constructor(public id?: number,
              public lastName?: string,
              public firstName?: string,
              public street?: string,
              public postcode?: string,
              public city?: string,
              public phone?: string,
              public skillSet?: QualificationGetDto[]) {
  }
}

import {QualificationGetDto} from "./QualificationGetDto";

export class EmployeeResponseDto {
  constructor(
    public id: number,
    public lastName: string,
    public firstName: string,
    public street: string,
    public postcode: string,
    public city: string,
    public phone: string,
    public skillset: QualificationGetDto[]
  ) { }
}

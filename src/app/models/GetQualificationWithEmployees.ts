import {Qualification} from "./Qualification";
import {EmployeeNameAndSkillDataDto} from "./EmployeeNameAndSkillDataDto";

export class GetQualificationWithEmployees {
  constructor(public qualification: Qualification,
              public employees: EmployeeNameAndSkillDataDto[] ) {}

}
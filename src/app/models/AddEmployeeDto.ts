export class AddEmployeeDto{
  constructor(
    public firstName:string,
    public lastName:string,
    public street: string,
    public postcode:string,
    public city:string,
    public phone: string,
    public skillSet: number[]
  ) {}
}

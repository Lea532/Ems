import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, startWith} from "rxjs";
import {Employee} from "../../models/employee";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-search-employee',
  standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
  templateUrl: './search-employee.component.html',
  styleUrl: './search-employee.component.css'
})
export class SearchEmployeeComponent implements OnChanges {
@Input() employees$!: Observable<Employee[]>;
@Output() filtered = new EventEmitter<Employee[]>();

  searchInput$ = new BehaviorSubject<string>('');
  filteredEmployees$!: Observable<Employee[]>;

ngOnChanges(changes: SimpleChanges) {

  if (this.employees$) {
    this.filteredEmployees$ = combineLatest([
      this.employees$.pipe(startWith([])),
      this.searchInput$.pipe(startWith('')),
    ]).pipe(
      map(([employees, searchText]) =>
        searchText.trim() === ''
          ? employees
          : employees.filter((employee) =>
            `${employee.firstName} ${employee.lastName}`
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
      )
    );
    this.filteredEmployees$.subscribe((filteredEmployees) =>
      this.filtered.emit(filteredEmployees)
    );
  }
}

onSearchInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  this.searchInput$.next(inputElement.value);
}
}

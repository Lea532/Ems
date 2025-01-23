import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, startWith} from "rxjs";
import {Qualification} from "../../models/Qualification";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-search-qualification',
  standalone: true,
  imports: [
    MatInputModule
  ],
  templateUrl: './search-qualification.component.html',
  styleUrl: './search-qualification.component.css'
})
export class SearchQualificationComponent implements OnChanges{
  @Input() qualifications$!: Observable<Qualification[]>;
  @Output() filtered = new EventEmitter<Qualification[]>();

  searchInput$ = new BehaviorSubject<string>('');
  filteredQualifications$!: Observable<Qualification[]>;

  ngOnChanges() {
    if (this.qualifications$) {
      this.filteredQualifications$ = combineLatest([
        this.qualifications$.pipe(startWith([])),
        this.searchInput$.pipe(startWith('')),
      ]).pipe(
        map(([qualifications, searchText]) =>
          searchText.trim() === ''
            ? qualifications
            : qualifications.filter((qualification) =>
              `${qualification.skill}`
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
        )
      );
      this.filteredQualifications$.subscribe((filteredQualifications) =>
        this.filtered.emit(filteredQualifications)
      );
    }
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchInput$.next(inputElement.value);
  }
}

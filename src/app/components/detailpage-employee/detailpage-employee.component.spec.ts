import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpageEmployeeComponent } from './detailpage-employee.component';

describe('DetailpageEmployeeComponent', () => {
  let component: DetailpageEmployeeComponent;
  let fixture: ComponentFixture<DetailpageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailpageEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailpageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

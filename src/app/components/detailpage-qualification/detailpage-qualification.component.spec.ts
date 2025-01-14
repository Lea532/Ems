import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpageQualificationComponent } from './detailpage-qualification.component';

describe('DetailpageQualificationComponent', () => {
  let component: DetailpageQualificationComponent;
  let fixture: ComponentFixture<DetailpageQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailpageQualificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailpageQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

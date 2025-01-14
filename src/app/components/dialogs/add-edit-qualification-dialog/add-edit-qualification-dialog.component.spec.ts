import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQualificationDialogComponent } from './add-edit-qualification-dialog.component';

describe('AddEditQualificationDialogComponent', () => {
  let component: AddEditQualificationDialogComponent;
  let fixture: ComponentFixture<AddEditQualificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditQualificationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQualificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

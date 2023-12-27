import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeAddEditComponent } from './programme-add-edit.component';

describe('StaffAddComponent', () => {
  let component: ProgrammeAddEditComponent;
  let fixture: ComponentFixture<ProgrammeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

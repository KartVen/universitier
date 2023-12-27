import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeViewComponent } from './programme-view.component';

describe('StaffAddComponent', () => {
  let component: ProgrammeViewComponent;
  let fixture: ComponentFixture<ProgrammeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

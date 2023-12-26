import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultiesComponent } from './faculties.component';

describe('SemestersComponent', () => {
  let component: FacultiesComponent;
  let fixture: ComponentFixture<FacultiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

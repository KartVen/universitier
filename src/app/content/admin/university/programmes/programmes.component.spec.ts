import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesComponent } from './programmes.component';

describe('SemestersComponent', () => {
  let component: ProgrammesComponent;
  let fixture: ComponentFixture<ProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

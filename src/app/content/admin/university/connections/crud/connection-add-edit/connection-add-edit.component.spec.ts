import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionAddEditComponent } from './connection-add-edit.component';

describe('StaffAddComponent', () => {
  let component: ConnectionAddEditComponent;
  let fixture: ComponentFixture<ConnectionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

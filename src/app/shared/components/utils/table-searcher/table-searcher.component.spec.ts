import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearcherComponent } from './table-searcher.component';

describe('TableSearcherComponent', () => {
  let component: TableSearcherComponent;
  let fixture: ComponentFixture<TableSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSearcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

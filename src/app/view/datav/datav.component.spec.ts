import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatavComponent } from './datav.component';

describe('DatavComponent', () => {
  let component: DatavComponent;
  let fixture: ComponentFixture<DatavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

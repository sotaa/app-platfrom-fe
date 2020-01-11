import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateApplicationComponent } from './add-or-update-application.component';

describe('AddOrUpdateApplicationComponent', () => {
  let component: AddOrUpdateApplicationComponent;
  let fixture: ComponentFixture<AddOrUpdateApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

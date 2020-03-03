import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayIsFailComponent } from './pay-is-fail.component';

describe('PayIsFailComponent', () => {
  let component: PayIsFailComponent;
  let fixture: ComponentFixture<PayIsFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayIsFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayIsFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

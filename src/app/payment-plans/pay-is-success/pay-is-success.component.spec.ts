import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayIsSuccessComponent } from './pay-is-success.component';

describe('PayIsSuccessComponent', () => {
  let component: PayIsSuccessComponent;
  let fixture: ComponentFixture<PayIsSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayIsSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayIsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

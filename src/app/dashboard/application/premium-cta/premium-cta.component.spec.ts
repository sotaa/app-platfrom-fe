import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCtaComponent } from './premium-cta.component';

describe('PremiumCtaComponent', () => {
  let component: PremiumCtaComponent;
  let fixture: ComponentFixture<PremiumCtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumCtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

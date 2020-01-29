import { TestBed } from '@angular/core/testing';

import { PaymentPlansService } from './payment-plans.service';

describe('PaymentPlansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentPlansService = TestBed.get(PaymentPlansService);
    expect(service).toBeTruthy();
  });
});

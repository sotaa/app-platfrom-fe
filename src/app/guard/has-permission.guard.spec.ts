import { TestBed, async, inject } from '@angular/core/testing';

import { HasPermissionGuard } from './has-permission.guard';

describe('HasPermissionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasPermissionGuard]
    });
  });

  it('should ...', inject([HasPermissionGuard], (guard: HasPermissionGuard) => {
    expect(guard).toBeTruthy();
  }));
});

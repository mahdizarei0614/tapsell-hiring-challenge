import { TestBed } from '@angular/core/testing';

import { LayoutCoreService } from './layout-core.service';

describe('LayoutCoreService', () => {
  let service: LayoutCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

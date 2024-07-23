import { TestBed } from '@angular/core/testing';

import { AsigCapService } from './asig-cap.service';

describe('AsigCapService', () => {
  let service: AsigCapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsigCapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

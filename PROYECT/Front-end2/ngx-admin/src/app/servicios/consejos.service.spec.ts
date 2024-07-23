import { TestBed } from '@angular/core/testing';

import { ConsejosService } from './consejos.service';

describe('ConsejosService', () => {
  let service: ConsejosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsejosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

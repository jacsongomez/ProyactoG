import { TestBed } from '@angular/core/testing';

import { CapacidadesService } from './capacidades.service';

describe('CapacidadesService', () => {
  let service: CapacidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

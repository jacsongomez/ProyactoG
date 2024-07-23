import { TestBed } from '@angular/core/testing';

import { PermiRolService } from './permi-rol.service';

describe('PermiRolService', () => {
  let service: PermiRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermiRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FisicaService } from './fisica.service';

describe('FisicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FisicaService = TestBed.get(FisicaService);
    expect(service).toBeTruthy();
  });
});

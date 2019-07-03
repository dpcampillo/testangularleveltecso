import { TestBed } from '@angular/core/testing';

import { JuridicaService } from './juridica.service';

describe('JuridicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JuridicaService = TestBed.get(JuridicaService);
    expect(service).toBeTruthy();
  });
});

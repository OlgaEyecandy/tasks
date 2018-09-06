import { TestBed, inject } from '@angular/core/testing';

import { InfoModel } from './info.model';

describe('InfoModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoModel]
    });
  });

  it('should be created', inject([InfoModel], (service: InfoModel) => {
    expect(service).toBeTruthy();
  }));
});

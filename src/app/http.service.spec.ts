import { TestBed, inject } from '@angular/core/testing';

import { GetFileService } from './http.service';

describe('GetFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetFileService]
    });
  });

  it('should be created', inject([GetFileService], (service: GetFileService) => {
    expect(service).toBeTruthy();
  }));
});

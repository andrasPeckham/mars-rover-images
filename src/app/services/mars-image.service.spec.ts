import { TestBed } from '@angular/core/testing';

import { MarsImageService } from './mars-image.service';

describe('MarsImageService', () => {
  let service: MarsImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarsImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

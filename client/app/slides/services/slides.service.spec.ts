import { TestBed, inject } from '@angular/core/testing';

import { SlidesService } from './slides.service';

describe('SlidesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlidesService]
    });
  });

  it('should ...', inject([SlidesService], (service: SlidesService) => {
    expect(service).toBeTruthy();
  }));
});

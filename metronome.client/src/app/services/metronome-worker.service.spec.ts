import { TestBed } from '@angular/core/testing';

import { MetronomeWorkerService } from './metronome-worker.service';

describe('MetronomeWorkerService', () => {
  let service: MetronomeWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetronomeWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

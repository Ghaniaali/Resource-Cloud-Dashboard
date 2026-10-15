import { TestBed } from '@angular/core/testing';
import { CloudResourceService } from './cloud-resource';

describe('CloudResource', () => {
  let service: CloudResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

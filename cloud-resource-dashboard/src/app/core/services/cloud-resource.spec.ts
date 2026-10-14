import { TestBed } from '@angular/core/testing';

import { CloudResource } from './cloud-resource';

describe('CloudResource', () => {
  let service: CloudResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

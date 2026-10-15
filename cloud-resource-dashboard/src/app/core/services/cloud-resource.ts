import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CloudServer,
  StorageBucket,
  CloudFunction
} from '../models/cloud-resource.model';

@Injectable({
  providedIn: 'root'
})
export class CloudResourceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getServers(): Observable<CloudServer[]> {
    return this.http.get<CloudServer[]>(
      `${this.apiUrl}/servers`
    );
  }

  getStorage(): Observable<StorageBucket[]> {
    return this.http.get<StorageBucket[]>(
      `${this.apiUrl}/storage`
    );
  }

  getFunctions(): Observable<CloudFunction[]> {
    return this.http.get<CloudFunction[]>(
      `${this.apiUrl}/functions`
    );
  }
}

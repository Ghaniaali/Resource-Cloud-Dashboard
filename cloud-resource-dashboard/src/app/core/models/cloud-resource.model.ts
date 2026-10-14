
export interface CloudServer {
  id: string;
  name: string;
  status: 'Running' | 'Stopped';
  type: string;
  region: string;
}

export interface StorageBucket {
  id: string;
  bucketName: string;
  sizeGB: number;
  region: string;
  createdDate: string;
}

export interface CloudFunction {
  id: string;
  name: string;
  runtime: string;
  memoryMB: number;
  region: string;
  lastUpdated: string;
}

export interface ResourceSummary {
  total: number;
  secondaryLabel: string;
  secondaryValue: number | string;
}

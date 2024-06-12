import { JobAdStatus } from './job-types';

export interface JobStatus {
  key: JobAdStatus;
  value: string;
  disabled: boolean;
}

export interface JobStatusChange {
  id: number;
  status: JobAdStatus;
}

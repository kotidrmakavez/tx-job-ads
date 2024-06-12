import { JobStatus } from '../models/filtering';

export const JOBS_URL: string = 'http://localhost:3000/jobs/';
export const INVOICES_URL: string = 'http://localhost:3000/invoices/';
export const DATE_NOW_UTC = new Date().toISOString().split('.')[0] + 'Z';
export const JOB_STATUSES: JobStatus[] = [
  {
    key: 'draft',
    value: 'Draft',
    disabled: false,
  },
  {
    key: 'published',
    value: 'Published',
    disabled: false,
  },
  {
    key: 'archived',
    value: 'Archived',
    disabled: false,
  },
];

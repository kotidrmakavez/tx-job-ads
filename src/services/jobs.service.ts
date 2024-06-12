import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JOBS_URL } from '../utils';

import { JobAd, JobAdDto, JobAdStatus } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}

  getJobs(): Observable<JobAd[]> {
    return this.http.get<JobAd[]>(JOBS_URL);
  }

  createJob(job: JobAdDto) {
    return this.http.post(JOBS_URL, job);
  }

  updateJob(job: JobAd) {
    return this.http.put(`${JOBS_URL}${job.id}`, job);
  }

  deleteJob(id: number) {
    return this.http.delete(JOBS_URL + id);
  }
}

import { Routes } from '@angular/router';
import { JobsComponent } from '../pages/jobs/jobs.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jobs' },
  { path: 'jobs', component: JobsComponent },
  {
    path: 'invoices',
    loadComponent: () =>
      import('../pages/invoices/invoices.component').then(
        (m) => m.InvoicesComponent,
      ),
  },
];

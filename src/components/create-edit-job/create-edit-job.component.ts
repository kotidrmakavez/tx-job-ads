import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { JobAd } from '../../models';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'create-edit-job',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelect,
    MatOption,
    SkillsComponent,
  ],
  templateUrl: './create-edit-job.component.html',
  styleUrl: './create-edit-job.component.scss',
})
export class CreateEditJobComponent {
  private subscription = new Subscription();
  editMode: boolean = false;
  jobForm: FormGroup;

  constructor(
    private _formBuild: FormBuilder,
    public dialogRef: MatDialogRef<CreateEditJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobAd,
  ) {
    this.jobForm = this._formBuild.group({
      title: ['', Validators.required],
      description: ['', [Validators.minLength(10), Validators.required]],
      skills: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.data) {
      this.editMode = true;
      this.title.setValue(this.data.title);
      this.description.setValue(this.data.description);
      this.status.setValue(this.data.status);
      this.skills.setValue(this.data.skills);
    } else {
      this.editMode = false;
    }
  }

  get title(): FormControl {
    return this.jobForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.jobForm.get('description') as FormControl;
  }

  get skills(): FormControl {
    return this.jobForm.get('skills') as FormControl;
  }

  get status(): FormControl {
    return this.jobForm.get('status') as FormControl;
  }

  cancel(): void {
    this.jobForm.reset();
    this.dialogRef.close();
  }

  ok(): void {
    this.dialogRef.close(this.jobForm.value);
  }

  handleSkills(skills: string[]) {
    this.skills.setValue(skills);
  }
}

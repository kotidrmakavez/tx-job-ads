import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'skills',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatButton, MatIconModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Input() skills: string[] = [];
  @Output() skillsEvent = new EventEmitter<string[]>();

  constructor() {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add skill
    if (value) {
      this.skills.push(value);
      this.skillsEvent.emit(this.skills);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: string): void {
    const index = this.skills?.indexOf(skill);

    if (index >= 0) {
      this.skills?.splice(index, 1);
      this.skillsEvent.emit(this.skills);
    }
  }

  edit(skill: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove skill if it no longer has a name
    if (!value) {
      this.remove(skill);
      return;
    }

    // Edit existing skill
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills[index] = value;
    }
  }
}

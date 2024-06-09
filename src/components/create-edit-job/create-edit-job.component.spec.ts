import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditJobComponent } from './create-edit-job.component';

describe('CreateEditJobComponent', () => {
  let component: CreateEditJobComponent;
  let fixture: ComponentFixture<CreateEditJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

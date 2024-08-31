import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService, Feedback } from '../feedback.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.css'],
})
export class FeedbackFormComponent {
  #fb = inject(FormBuilder); // Injecting FormBuilder
  #feedbackService = inject(FeedbackService);
  constructor() {}

  // Using FormBuilder to create the form
  feedbackForm = this.#fb.nonNullable.group({
    event_id: [this.generateEventId(), Validators.required], // string
    event_date: ['', Validators.required], // string
    event_name: ['', Validators.required], // string
    event_rate: [0, Validators.required], // number
    why_this_rate: ['', Validators.required], // string
    presentation_content: [0], // number
    session_duration: [0], // number
    hands_on_lab: [0], // number
    event_platform: [0], // number
    presenter_name: ['', Validators.required], // string
    presenter_rate: [0], // number
    feedback_to_presenter: [''], // string
    lab_trainer: [''], // string
    lab_trainer_rate: [0], // number
    feedback_for_trainer: [''], // string
    lab_session_improvements: [''], // string
    future_topics_suggest: [''], // string
    how_you_heard_about_event: [''], // string
  });

  onSubmit() {
    console.log('Form Validity:', this.feedbackForm.valid);
    console.log('Form Values:', this.feedbackForm.value);

    if (this.feedbackForm.valid) {
      const feedback: Feedback = this.feedbackForm.getRawValue();

      this.#feedbackService.submitFeedback(feedback).subscribe({
        next: (response) => {
          console.log('Feedback submitted:', response);
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
        },
        complete: () => {
          console.log('Feedback submission complete');
        },
      });
    }
  }

  generateEventId(): string {
    return `event_${Date.now()}`;
  }
}

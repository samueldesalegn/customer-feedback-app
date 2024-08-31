import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService, Feedback } from '../feedback.service';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for ngFor, etc.
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.css'],
})
export class FeedbackListComponent {
  feedbacks = signal<Feedback[]>([]);
  #feedbackService = inject(FeedbackService);

  constructor() {}

  ngOnInit() {
    this.#feedbackService.getFeedbackList().subscribe((data) => {
      this.feedbacks.set(data);
    });
  }
}

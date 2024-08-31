import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feedback {
  event_id: string;
  event_date: string;
  event_name: string;
  event_rate: number;
  why_this_rate: string;
  presentation_content: number;
  session_duration: number;
  hands_on_lab: number;
  event_platform: number;
  presenter_name: string;
  presenter_rate: number;
  feedback_to_presenter: string;
  lab_trainer: string;
  lab_trainer_rate: number;
  feedback_for_trainer: string;
  lab_session_improvements: string;
  future_topics_suggest: string;
  how_you_heard_about_event: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  #apiUrl = 'http://localhost:3000/api'; // Adjust this to your actual backend URL
  #http =inject(HttpClient);

  constructor() {}

  submitFeedback(feedback: Feedback) {
    return this.#http.post(`${this.#apiUrl}/submit-feedback`, feedback);
  }

  getFeedbackList(): Observable<Feedback[]> {
    return this.#http.get<Feedback[]>(`${this.#apiUrl}/feedbacks`);
  }
}

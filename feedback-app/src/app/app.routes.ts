import { Routes } from '@angular/router';
import { FeedbackFormComponent } from './feedbackform/feedbackform.component';
import { FeedbackListComponent } from './feedbacklist/feedbacklist.component';

export const routes: Routes = [
  { path: 'submit-feedback', component: FeedbackFormComponent },
  { path: 'feedbacks', component: FeedbackListComponent },
  { path: '', redirectTo: '/submit-feedback', pathMatch: 'full' },
];

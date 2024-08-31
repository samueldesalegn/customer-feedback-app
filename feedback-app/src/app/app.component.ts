import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule], // Add HttpClientModule here
  template: `
    <nav>
      <a routerLink="/submit-feedback">Submit Feedback</a>
      <a routerLink="/feedbacks">View Feedbacks</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'feedback-app';
}

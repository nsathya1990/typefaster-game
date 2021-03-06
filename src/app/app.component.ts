import { Component } from '@angular/core';
import User from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User = null;

  setUserInfo(user: User) {
    this.user = user;
  }
}

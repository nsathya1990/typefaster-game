import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

import User from '../models/User';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  counter: number;
  timerStartValue = 3;
  isGameConsoleVisible = false;
  isPlayBtnVisible = true;
  isTimerVisible = false;
  subscription: Subscription;
  usersLists = [
    { name: 'User-A', timeTaken: null },
    { name: 'User-B', timeTaken: null },
  ];
  currentUser: User = this.usersLists[0];

  constructor() {}

  ngOnInit(): void {}

  onPlay() {
    console.log('inside onPlay()');
    this.isTimerVisible = true;
    const numbers = timer(0, 1000);
    this.subscription = numbers.pipe(take(4)).subscribe(
      (value) => {
        this.isPlayBtnVisible = false;
        console.log(`value is ${value}`);
        this.counter = this.timerStartValue - value;
      },
      (error) => {
        this.isPlayBtnVisible = false;
        alert(error + 'please reload the page');
      },
      () => {
        this.isTimerVisible = false;
        this.isGameConsoleVisible = true;
        console.log('completed');
      }
    );
  }
  updateScoreOfUser(score: number) {
    this.currentUser.timeTaken = score;
    console.log(this.currentUser);
    console.log(this.usersLists);
  }
}

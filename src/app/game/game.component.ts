import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  counter: number;
  timerStartValue = 3;
  isGameConsoleVisible = false;
  isTimerVisible = false;
  private subscription: Subscription;

  constructor() {}

  ngOnInit(): void {}

  onPlay() {
    console.log('inside onPlay()');
    this.isTimerVisible = true;
    const numbers = timer(0, 1000);
    const takeFourNumbers = numbers.pipe(take(4));
    this.subscription = takeFourNumbers.subscribe(
      (value) => {
        console.log(`value is ${value}`);
        this.counter = this.timerStartValue - value;
      },
      (error) => alert(error + 'please reload the page'),
      () => {
        this.isTimerVisible = false;
        this.isGameConsoleVisible = true;
        console.log('completed');
      }
    );
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css'],
})
export class GameConsoleComponent implements OnInit {
  sentencesList = [
    'She',
    'She had the gift of being able to paint songs.',
    'Giving directions that the mountains are to the west only works when you can see them.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler',
    'The most disastrous thing that you can ever learn is your first programming language. - Alan Kay',
  ];
  sentence: string;
  userInput: string = null;
  display: string;
  timeStarted: number;
  timeEnded: number;
  timeTaken: number;

  constructor() {}

  ngOnInit(): void {
    this.sentence = this.sentencesList[0];
    console.log('timer started');
    const date = new Date();
    console.log(date);
    console.log(new Date().getTime());
    this.timeStarted = new Date().getTime();
  }

  transform(): string {
    const milliseconds = this.timeTaken % 1000;
    console.log(milliseconds);
    return (this.timeTaken - milliseconds) / 1000 + 's:' + milliseconds + 'ms';
  }

  onSubmit() {
    this.timeEnded = new Date().getTime();
    console.log(this.userInput);
    console.log('timer stopped');
    console.log(new Date().getTime());
    this.timeTaken = this.timeEnded - this.timeStarted;
    this.display = this.transform();
  }

  onSubmitUsingEnterKey() {
    if (this.userInput === this.sentence) {
      this.onSubmit();
    }
  }
}

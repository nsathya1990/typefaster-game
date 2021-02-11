import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css'],
})
export class GameConsoleComponent implements OnInit {
  @Input() userName: string;
  @Output() receivedScore = new EventEmitter<number>();
  sentencesList = [
    'She',
    'She had the gift of being able to paint songs.',
    'Giving directions that the mountains are to the west only works when you can see them.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler',
    'The most disastrous thing that you can ever learn is your first programming language. - Alan Kay',
  ];
  isInputAreaDisabled = false;
  sentence: string;
  userInput: string = null;
  timeStarted: number;
  timeEnded: number;
  timeTaken: number;

  constructor() {}

  ngOnInit(): void {
    this.sentence = this.sentencesList[0];
    console.log('timer started');
    const date = new Date();
    console.log(new Date().getTime());
    this.timeStarted = new Date().getTime();
  }


  onSubmit() {
    this.isInputAreaDisabled = true;
    this.timeEnded = new Date().getTime();
    console.log(this.userInput);
    console.log('timer stopped');
    this.timeTaken = this.timeEnded - this.timeStarted;
    console.log(this.timeTaken);
    this.receivedScore.emit(this.timeTaken);
  }

  onSubmitUsingEnterKey() {
    if (this.userInput === this.sentence) {
      this.onSubmit();
    }
  }
}

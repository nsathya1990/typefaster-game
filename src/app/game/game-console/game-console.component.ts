import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css'],
})
export class GameConsoleComponent implements OnInit {
  @Input() sentence: string;
  @Input() userName: string;
  @Output() receivedScore = new EventEmitter<number>();
  isInputAreaDisabled = false;
  userInput: string = null;
  timeStarted: number;
  timeEnded: number;
  timeTaken: number;

  constructor() {}

  ngOnInit(): void {
    console.log('timer started');
    const date = new Date();
    console.log(new Date().getTime());
    this.timeStarted = new Date().getTime();
  }

  onSubmit() {
    this.isInputAreaDisabled = true;
    this.timeEnded = new Date().getTime();
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

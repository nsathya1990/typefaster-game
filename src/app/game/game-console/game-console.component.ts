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
  validationMsg: string = null;

  constructor() {}

  ngOnInit(): void {
    this.timeStarted = new Date().getTime();
  }

  onSubmit(): void {
    if (!this.isValidationSuccessful()) {
      this.validationMsg = 'Incorrect';
      return;
    }
    this.validationMsg = 'Correct';
    this.isInputAreaDisabled = true;
    this.timeEnded = new Date().getTime();
    this.timeTaken = this.timeEnded - this.timeStarted;
    this.receivedScore.emit(this.timeTaken);
  }

  isValidationSuccessful(): boolean {
    const isValidated = this.userInput === this.sentence;
    return isValidated;
  }
}

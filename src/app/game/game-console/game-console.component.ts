import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.css'],
})
export class GameConsoleComponent implements OnInit {
  isSubmitDisabled = true;
  sentencesList = [
    'She had the gift of being able to paint songs.',
    'Giving directions that the mountains are to the west only works when you can see them.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler',
    'The most disastrous thing that you can ever learn is your first programming language. - Alan Kay',
  ];
  sentence: string;
  userInput: string = null;

  @ViewChild('typeFasterForm', {static: false}) tfForm;

  constructor() {}

  ngOnInit(): void {
    this.sentence = this.sentencesList[0];
  }

  onSubmit() {
    console.log('I am in');
  }
}

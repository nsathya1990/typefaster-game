import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

import User from '../models/User';

import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  counter: number;
  currentUser: User;
  winner: User;
  gameSentence: string;
  subscription: Subscription;
  timerStartValue = 3;
  userCount = 0;
  isGameConsoleVisible = false;
  isGameOver = false;
  isPlayBtnVisible = true;
  isTimerVisible = false;
  usersLists = [
    { name: 'User-A', timeTaken: null },
    { name: 'User-B', timeTaken: null },
  ];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGameDetails().subscribe(
      (respData) => {
        this.gameSentence = respData['sentence'];
        console.log(respData);
      },
      (error) => {
        console.log(error);
      }
    );
    this.currentUser = this.usersLists[this.userCount];
  }

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
    // After 2 seconds, next player's turn
    setTimeout(() => {
      this.nextUser();
    }, 2000);
  }

  nextUser() {
    this.isGameConsoleVisible = false;
    ++this.userCount;
    if (this.userCount < this.usersLists.length) {
      this.isPlayBtnVisible = true;
      this.currentUser = this.usersLists[this.userCount];
    } else if (this.userCount === this.usersLists.length) {
      this.findWinner();
      this.isGameOver = true;
    }
  }

  findWinner() {
    this.winner = this.usersLists.reduce((prev: User, curr: User) => {
      return prev.timeTaken < curr.timeTaken ? prev : curr;
    });
    console.log(this.winner);
  }
}

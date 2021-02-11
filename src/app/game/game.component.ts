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
  usersLists: User[];
  gameSentence: string;
  subscription: Subscription;
  timerStartValue = 3;
  userCount = 0;
  isGameConsoleVisible = false;
  isGameOver = false;
  isPlayBtnVisible = true;
  isTimerVisible = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // get game details from the firebase api
    this.gameService.getGameDetails().subscribe(
      (respData) => {
        this.gameSentence = respData['sentence'];
        console.log(respData);
        this.usersLists = respData['user'];
        this.getCurrentUserName(respData['results']);
      },
      (error) => console.error(error)
    );
  }

  onPlay() {
    console.log('inside onPlay()');
    this.isTimerVisible = true;
    const numbers = timer(0, 1000);
    this.subscription = numbers.pipe(take(4)).subscribe(
      (value) => {
        this.isPlayBtnVisible = false;
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
        //
      }
    );
  }

  updateScoreOfUser(score: number) {
    this.currentUser.timeTaken = score;
    console.log(this.currentUser);
    console.log(this.usersLists);
    this.gameService
      .updateUserDetails({
        [this.currentUser.name]: { present: true, timeTaken: score },
      })
      .subscribe((data) => this.checkForScores());
  }

  checkForScores() {
    this.gameService.getScores().subscribe((data) => {
      console.log(data);
      const gameOver = Object.keys(data).every((element) => {
        const user = data[element];
        console.log(user);
        return user['present'] && user['timeTaken'] > 0;
      });
      console.log(`is game over: ${gameOver}`);
      // After 2 seconds, check for scores again
      if (gameOver) {
        this.findWinner(data);
        this.isGameConsoleVisible = false;
        this.isGameOver = true;
      } else {
        setTimeout(() => {
          this.checkForScores();
        }, 2000);
      }
    });
  }

  findWinner(users) {
    const winner = Object.keys(users).reduce((prevEle, currEle) => {
      const currUser = users[currEle];
      const prevUser = users[prevEle];
      return prevUser.timeTaken < currUser.timeTaken ? prevEle : currEle;
    });
    this.winner = { name: winner, timeTaken: users[winner].timeTaken };
    console.log(this.winner);
  }

  getCurrentUserName(userListObjects: Object) {
    console.log(userListObjects);
    if (!userListObjects[this.usersLists[0].name]['present']) {
      this.currentUser = this.usersLists[0];
    } else {
      this.currentUser = this.usersLists[1];
    }
    this.gameService
      .updateUserDetails({
        [this.currentUser.name]: { present: true },
      })
      .subscribe();
    console.log(this.currentUser);
  }
}

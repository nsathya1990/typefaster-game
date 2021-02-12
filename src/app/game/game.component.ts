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
        this.usersLists = respData['user'];
        this.getCurrentUserName(respData['results']);
      },
      (error) => console.error(error)
    );
  }

  onPlay() {
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
      }
    );
  }

  updateScoreOfUser(score: number) {
    this.currentUser.timeTaken = score;
    this.gameService
      .updateUserDetails({
        [this.currentUser.name]: { present: true, timeTaken: score },
      })
      .subscribe((data) => this.checkForScores());
  }

  checkForScores() {
    this.gameService.getScores().subscribe((data) => {
      const gameOver = Object.keys(data).every((element) => {
        const user = data[element];
        return user['present'] && user['timeTaken'] > 0;
      });
      console.log(`is game over: ${gameOver}`);
      if (gameOver) {
        this.findWinner(data);
        this.isGameConsoleVisible = false;
        this.isGameOver = true;
      } else {
        setTimeout(() => {
          // check for scores of the other player every 2 seconds
          this.checkForScores();
        }, 2000);
      }
    });
  }

  findWinner(users: Object) {
    const winner = Object.keys(users).reduce((prevEle, currEle) => {
      const currUser = users[currEle];
      const prevUser = users[prevEle];
      return prevUser.timeTaken < currUser.timeTaken ? prevEle : currEle;
    });
    this.winner = { name: winner, timeTaken: users[winner].timeTaken };
  }

  getCurrentUserName(userListObjects: Object) {
    if (
      userListObjects[this.usersLists[0].name]['present'] &&
      userListObjects[this.usersLists[0].name]['timeTaken'] > 0 &&
      userListObjects[this.usersLists[1].name]['present'] &&
      userListObjects[this.usersLists[1].name]['timeTaken'] > 0
    ) {
      console.log('reseting');
      this.resetResults();
    }

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
  }

  resetResults() {
    // hard-coded for now. To be changed later on
    const data = {
      'User-1': {
        present: false,
      },
      'User-2': {
        present: false,
      },
    };
    this.gameService.resetResults(data).subscribe();
  }
}

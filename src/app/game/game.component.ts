import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

import GameDetails from '../models/GameDetails';

import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  counter: number;
  currentUser: string;
  gameDetails: GameDetails;
  winner: Object;
  userLists: string[];
  gameSentence: string;
  subscription: Subscription;
  timerStartValue = 3;
  userCount = 0;
  isGameConsoleVisible = false;
  isGameOver = false;
  isPlayBtnVisible = false;
  isResetBtnVisible = false;
  isTimerVisible = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // get game details from the firebase rest api
    this.gameService.getGameDetails().subscribe(
      (gameDetails: GameDetails) => {
        console.log(gameDetails);
        this.gameDetails = gameDetails;
        this.gameSentence = gameDetails['sentence'];
        this.userLists = gameDetails['users'];
        if (this.isUserSlotAvailable()) {
          console.log('user slot available');
          this.getUsernameAndSave();
        } else {
          console.log('user slot not available');
          this.isResetBtnVisible = true;
        }
      },
      (error) => console.error(error)
    );
  }

  getUsernameAndSave(): void {
    this.isPlayBtnVisible = true;
    const availableUser = this.getUserName();
    console.log(`availableUser is ${availableUser}`);
    this.setUserAsPresent(availableUser);
  }

  setUserAsPresent(user: string): void {
    this.gameService
      .setUserAsPresent(this.getUserName())
      .subscribe((response) => {
        console.log(response);
        this.currentUser = user;
        this.gameDetails[user] = response;
        console.log(`currentUser is ${this.currentUser}`);
        this.updateUserSlotAvailability();
      });
  }

  updateUserSlotAvailability(): void {
    console.log(this.gameDetails);
    const userSlotUnavailable = this.userLists.every(
      (userName) => this.gameDetails[userName].present === true
    );
    console.log(`userSlotUnavailable: ${userSlotUnavailable}`);
    if (userSlotUnavailable) {
      this.gameService.setSlotAsUnavailable().subscribe((response) => {
        console.log(response);
        console.log('user slot set as unavailable');
      });
    }
  }

  isUserSlotAvailable(): boolean {
    return this.gameDetails['user-slots'].available;
  }

  getUserName(): string {
    console.log(this.gameDetails);
    for (let i = 0; i < this.userLists.length; i++) {
      if (!this.gameDetails[this.userLists[i]].present) {
        return this.userLists[i];
      }
    }
  }

  onPlay() {
    this.isPlayBtnVisible = false;
    this.isTimerVisible = true;
    const numbers = timer(0, 1000);
    this.subscription = numbers.pipe(take(4)).subscribe(
      (value) => {
        this.counter = this.timerStartValue - value;
      },
      (error) => {
        alert(error + 'please reload the page');
      },
      () => {
        this.isTimerVisible = false;
        this.isGameConsoleVisible = true;
      }
    );
  }

  updateScoreOfUser(score: number) {
    this.gameService
      .setUserScore(this.currentUser, score)
      .subscribe((data) => this.checkForAllScores());
  }

  checkForAllScores(): void {
    console.log('checkForAllScores');
    let isWinnerFound = false;
    this.gameService.getGameDetails().subscribe((gameDetails: GameDetails) => {
      isWinnerFound = this.userLists.every(
        (userName) =>
          gameDetails[userName]['timeTaken'] &&
          gameDetails[userName]['timeTaken'] > 0
      );
      if (isWinnerFound) {
        console.log('winner found');
        this.onWinnerFound(gameDetails);
      } else {
        console.log('Winnner not available yet');
        setTimeout(() => {
          this.checkForAllScores();
        }, 2000);
      }
    });
  }

  onWinnerFound(gameDetails: GameDetails) {
    const winner = this.userLists.reduce((prevUserName, currUserName) => {
      return gameDetails[prevUserName]['timeTaken'] <
        gameDetails[currUserName]['timeTaken']
        ? prevUserName
        : currUserName;
    });
    this.gameOver(winner, gameDetails[winner].timeTaken);
  }

  gameOver(name: string, timeTaken: number) {
    console.log('game over');
    this.winner = { name, timeTaken };
    console.log(this.winner);
    setTimeout(() => {
      console.log('after 4 seconds displaying winner');
      this.isGameConsoleVisible = false;
      this.isGameOver = true;
    }, 4000);
  }

  onResetGame(): void {
    this.gameService.resetGame(this.userLists).subscribe((gameDetails: GameDetails) => {
      this.gameDetails = gameDetails;
      this.isResetBtnVisible = false;
      this.isPlayBtnVisible = true;
      this.getUsernameAndSave();
    });
  }
}

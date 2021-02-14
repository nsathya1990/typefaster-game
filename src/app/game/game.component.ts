import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

import GameDetails from '../models/GameDetails';
import User from '../models/User';

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
  loader = true;
  loaderResetToPlay = false;
  loaderWaitingForWinner = false;
  @Output() userDetails = new EventEmitter<User>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // get game details from the firebase rest api
    this.gameService.getGameDetails().subscribe(
      (gameDetails: GameDetails) => {
        this.gameDetails = gameDetails;
        this.gameSentence = gameDetails['sentence'];
        this.userLists = gameDetails['users'];
        if (this.isUserSlotAvailable()) {
          this.isPlayBtnVisible = true;
        } else {
          this.isResetBtnVisible = true;
        }
        this.loader = false;
      },
      (error) => console.error(error)
    );
  }

  getUsernameAndSave(): void {
    const availableUser = this.getUserName();
    this.setUserAsPresent(availableUser);
  }

  setUserAsPresent(user: string): void {
    this.gameService
      .setUserAsPresent(this.getUserName())
      .subscribe((response) => {
        console.log(response);
        this.currentUser = user;
        this.userDetails.emit({ name: this.currentUser });
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
    if (userSlotUnavailable) {
      this.gameService.setSlotAsUnavailable().subscribe((response) => {
        console.log(response);
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
    this.getUsernameAndSave();
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
    this.gameService.setUserScore(this.currentUser, score).subscribe((data) => {
      this.userDetails.emit({ name: this.currentUser, timeTaken: score });
      this.checkForAllScores();
    });
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
        this.loaderWaitingForWinner = true;
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

  gameOver(name: string, timeTaken: number): void {
    console.log('game over');
    this.winner = { name, timeTaken };
    setTimeout(() => {
      this.loaderWaitingForWinner = false;
      this.isGameConsoleVisible = false;
      this.isGameOver = true;
    }, 3000);
  }

  onResetGame(): void {
    this.isResetBtnVisible = false;
    this.loaderResetToPlay = true;
    this.gameService
      .resetGame(this.userLists)
      .subscribe((gameDetails: GameDetails) => {
        this.gameDetails = gameDetails;
        this.loaderResetToPlay = false;
        this.isPlayBtnVisible = true;
      });
  }
}

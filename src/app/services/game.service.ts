import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl =
    'https://typefaster-9feea-default-rtdb.firebaseio.com/game/-MTOa83U2r_hW8LxJbmX';

  constructor(private httpClient: HttpClient) {}

  getGameDetails(): Observable<Object> {
    return this.httpClient.get(this.baseUrl + '.json');
  }

  setSlotAsUnavailable() {
    return this.httpClient.patch(this.baseUrl + `/user-slots.json`, {
      available: false,
    });
  }

  setUserAsPresent(user: string) {
    return this.httpClient.patch(this.baseUrl + `/${user}.json`, {
      present: true,
    });
  }

  setUserScore(user: string, score: number) {
    return this.httpClient.patch(this.baseUrl + `/${user}.json`, {
      timeTaken: score,
    });
  }

  setSlotsAsUnavailable() {
    return this.httpClient.patch(this.baseUrl + '/user-slots.json', {
      available: false,
    });
  }

  isWinnerAvailable() {
    return this.httpClient.get(this.baseUrl + `/winner.json`);
  }

  setWinner(name: string, score: number) {
    return this.httpClient.patch(this.baseUrl + '/winner.json', {
      name,
      timeTaken: score,
    });
  }

  resetGame(userLists: string[]) {
    const data = {
      'user-slots': {
        available: true,
      },
    };
    userLists.forEach((userName) => (data[userName] = { present: false }));
    return this.httpClient.patch(this.baseUrl + '.json', data);
  }
}

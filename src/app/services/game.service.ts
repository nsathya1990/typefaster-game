import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl =
    'https://typefaster-9feea-default-rtdb.firebaseio.com/game/-MTHkr-LsriyMzXgbiYm';

  constructor(private httpClient: HttpClient) {}

  getGameDetails(): Observable<Object> {
    return this.httpClient.get(this.baseUrl + '.json');
  }

  getScores() {
    return this.httpClient.get(this.baseUrl + '/results.json');
  }

  updateUserDetails(data) {
    console.log(data);
    return this.httpClient.patch(this.baseUrl + '/results.json', data);
  }
}

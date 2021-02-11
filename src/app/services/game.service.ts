import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl =
    'https://typefaster-9feea-default-rtdb.firebaseio.com/game/-MTHcaGj1duw23XWPo8B.json';

  constructor(private httpClient: HttpClient) {}

  getGameDetails(): Observable<Object> {
    return this.httpClient.get(this.baseUrl);
  }
}

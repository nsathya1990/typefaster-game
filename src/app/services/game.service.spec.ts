import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { GameService } from './game.service';
import { of } from 'rxjs';

describe('GameService', () => {
  let gameService: GameService;
  let httpTestingController: HttpTestingController;
  let baseUrl =
    'https://typefaster-9feea-default-rtdb.firebaseio.com/game/-MTOa83U2r_hW8LxJbmX';
  let userDetails: Object;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([GameService], (service: GameService) => {
    gameService = service;
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  it("should get game details when the function 'getGameDetails()' is called", () => {
    userDetails = {
      'User-1': {
        present: false,
      },
      'User-2': {
        present: false,
      },
      sentence:
        'Giving directions that the mountains are to the west only works when you can see them.',
      'user-slots': {
        available: true,
      },
      users: ['User-1', 'User-2'],
    };
    let result;
    gameService.getGameDetails().subscribe((responseData) => {
      result = responseData;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: baseUrl + '.json',
    });
    req.flush([userDetails]);
    expect(result[0]).toEqual(userDetails);
  });
});

# TypefasterGame Overview

This is a simple multi-player game in the browser.
The games will be played between 2 users. Who will be able to type correctly a
given sentence, in the smallest amount of time, will win the game!

## Get started

### Clone the repo

```shell
git clone https://github.com/nsathya1990/typefaster-game
cd intern-angular
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
```

### How to start?

The `npm start` does JIT (Jut-In_Time) compilation of the application, watches for changes to the source files, runs the application on port `4200`.
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```shell
npm start
```

Shut it down manually with `Ctrl-C`.

### How to play?

- As soon as we navigate to `http://localhost:4200/` for the first time, a username will be fetched from the backend and that user's turn will come up. He can begin by clicking the Play button and proceed with the game.
- Once a user finishes his turn, he will see his scores.
- Once the other user has also finished his turn, then both the users will be shown the winner name and the winning time on the results page.
- We can also access the application at `https://typefaster-9feea.web.app/`
- Please read the note of 'Caution' before playing

### Making requests to the backend API

We are making use of Firebase for backend solution.
The two user details including the user names (User-1 and User-2) are fetched from the backend using the endpoint:
`https://typefaster-9feea-default-rtdb.firebaseio.com/game/-MTHkr-LsriyMzXgbiYm.json` (GET)

- When the main page `http://localhost:4200/` (or) `https://typefaster-9feea.web.app/` is loaded for the first time, User-1 will become the current user.
- When the main page is loaded for the second time, User-2 will become the current user (`https://typefaster-9feea.web.app/` in case of loading it on a different computer).

We are storing the state of the game in the backend by hiting the endpoint 'https://typefaster-9feea-default-rtdb.firebaseio.com/game/-MTHkr-LsriyMzXgbiYm/results.json' (PATCH)

- As soon as the current user is figured out (say, User-1), we pass the data to the backend saying that the user is available has begun playing.
  Sample Body
  `{ "User-1": { "present": true } }`
- Once the current user has finished his turn and submitted, we pass the time taken data (in milliseconds) to the backend updating the user score.
  Sample Body
  `{ "User-1": { "present": true, "timeTaken": 21000 } }`
- Every 2 seconds, we make a GET request to the above endpoint to check whether both the users have completed their turn. The response will be as follows once both the users have finished their turn.
  `{ "User-1": { "present": true, "timeTaken": 21000 }, "User-2": { "present": true, "timeTaken": 15000 } }`

### Caution

- Once you load the main page on the browser, please continue and finish your turn. If that's not done and let's say that the page is reloaded before finishing the game, then the UI will become out-of-sync with the user details stored in the backend and we may not be able to get the results.
- This will be improved upon very soon.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

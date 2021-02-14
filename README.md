# TypefasterGame (Angular) Overview

This is a simple multi-player game in the browser.
The games will be played between 2 users. Who will be able to type correctly a
given sentence, in the smallest amount of time, will win the game!

## Get started

### Clone the repo

```shell
git clone https://github.com/nsathya1990/typefaster-game
cd typefaster-game
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
```

### How to start?

The `npm start` does JIT compilation of the application, watches for changes to the source files, runs the application on port `4200`.
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```shell
npm start
```

Shut it down manually with `Ctrl-C`.

### How to play?

- As soon as we navigate to `http://localhost:4200/` for the first time, We can begin by clicking the Play button and proceed with the game.
- Once a user finishes his turn, he will see his scores. And wait for the other person's score.
- Once the other user has also finished his turn, then both the users will be shown the winner name and the winning time on the results page.
- We can also access the application at `https://typefaster-9feea.web.app/`

### Making requests to the backend API

We are making use of Firebase for backend solution.
The two user details including the user names (User-1 and User-2) are fetched from the backend using the endpoint:
`https://typefaster-9feea-default-rtdb.firebaseio.com/game/-MTOa83U2r_hW8LxJbmX.json` (GET)

- When the main page `http://localhost:4200/` (or) `https://typefaster-9feea.web.app/` is loaded for the first time, User-1 will become the current user.
- When the main page is loaded for the second time, User-2 will become the current user.

### Caution

- Once you start playing, please continue and finish your turn. If that's not done and let's say that the page is reloaded before finishing the game, then the UI will become out-of-sync with the user details stored in the backend and we may not be able to get the winner.
- To overcome that we may need to 'Reset' 
- This will be improved upon very soon.

### JSON Structure

When the game begins (after reset)
`{ "User-1": { "present": false }, "User-2": { "present": false }, "sentence": "Giving directions that the mountains are to the west only works when you can see them.", "user": [ "User-1", "User-2" ], "user-slots": { "available": true } }`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

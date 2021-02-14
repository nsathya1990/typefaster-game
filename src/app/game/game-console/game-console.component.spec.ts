import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormattedTimePipe } from '../../pipes/formatted-time.pipe';

import { GameConsoleComponent } from './game-console.component';

describe('GameConsoleComponent', () => {
  let component: GameConsoleComponent;
  let fixture: ComponentFixture<GameConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameConsoleComponent, FormattedTimePipe],
      imports: [FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should 'isValidationSuccessful()' return true when user input matches with the given sentence", () => {
    component.userInput = 'She had the gift of being able to paint songs.';
    component.sentence = 'She had the gift of being able to paint songs.';
    expect(component.isValidationSuccessful()).toBeTrue();
  });

  it("should 'isValidationSuccessful()' return false when user input does not match with the given sentence", () => {
    component.userInput = 'She had the gift of being able to paint songs.';
    component.sentence = 'She had the of being';
    expect(component.isValidationSuccessful()).toBeFalse();
  });

  it("should emit received score on calling the 'onSubmit' function", () => {
    component.userInput = 'humty dumpty sat on a wall';
    component.sentence = 'humty dumpty sat on a wall';
    component.timeStarted = new Date().getTime();
    component.onSubmit();
    expect(component.timeTaken).toBeLessThan(component.timeStarted);
  });
});

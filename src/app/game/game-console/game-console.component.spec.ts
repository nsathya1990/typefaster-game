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

  it("should call 'onSubmit()' function from 'onSubmitUsingEnterKey' function when userInput is equal to the given sentence", () => {
    spyOn(component, 'onSubmit');
    component.userInput = 'She had the gift of being able to paint songs.';
    component.sentence = 'She had the gift of being able to paint songs.';
    component.onSubmitUsingEnterKey();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it("should not call 'onSubmit()' function from 'onSubmitUsingEnterKey' function when userInput is not equal to the given sentence", () => {
    spyOn(component, 'onSubmit');
    component.userInput = 'She had the gift of being able to paint songs.';
    component.sentence = 'She had the gift of being able to paint songs';
    component.onSubmitUsingEnterKey();
    expect(component.onSubmit).not.toHaveBeenCalled();
  });

  it("should emit received score on calling the 'onSubmit' function", () => {
    component.sentence = 'humty dumpty sat on a wall';
    component.timeStarted = new Date().getTime();
    component.onSubmit();
    expect(component.timeTaken).toBeLessThan(component.timeStarted);
  });
});

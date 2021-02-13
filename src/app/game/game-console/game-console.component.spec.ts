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
});

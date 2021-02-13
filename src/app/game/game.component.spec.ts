import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as Rx from 'rxjs';
import { delay } from 'rxjs/operators';

import { GameService } from '../services/game.service';

import { LoaderComponent } from '../shared/loader/loader.component';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let onPlayEl: DebugElement;
  let timerEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, LoaderComponent],
      imports: [HttpClientTestingModule],
      providers: [GameService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.userLists = ['User-1', 'User-2'];
    component.gameDetails = <any>{
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
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should 'Play' button be not visible on loading of the component", () => {
    onPlayEl = fixture.debugElement.query(By.css('[type="button"]'));
    expect(onPlayEl).toBeFalsy();
  });

  it("should call 'onPlay' function when user clicks on 'Play'", () => {
    spyOn(component, 'onPlay');
    component.loader = false;
    component.isPlayBtnVisible = true;
    fixture.detectChanges();
    onPlayEl = fixture.debugElement.query(By.css('[type="button"]'));
    onPlayEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onPlay).toHaveBeenCalled();
  });

  it('should timer be not visible on loading of the component', () => {
    timerEl = fixture.debugElement.query(By.css('h2'));
    expect(timerEl).toBeFalsy();
  });

  it("should timer be visible on clicking 'Play' button", () => {
    component.loader = false;
    component.isPlayBtnVisible = true;
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('[type="button"]'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    timerEl = fixture.debugElement.query(By.css('h2'));
    expect(timerEl).toBeTruthy();
  });

  it("should call getGameDetails (in GameService) and get 'users' array as response", fakeAsync(() => {
    const service = fixture.debugElement.injector.get(GameService);
    spyOn(service, 'getGameDetails').and.callFake(() => {
      return Rx.of({
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
      }).pipe(delay(100));
    });
    component.ngOnInit();
    tick(100);
    expect(component.gameSentence).toEqual(
      'Giving directions that the mountains are to the west only works when you can see them.'
    );
    expect(component.userLists.length).toEqual(2);
  }));
});

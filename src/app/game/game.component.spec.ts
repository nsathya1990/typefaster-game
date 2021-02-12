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

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let onPlayEl: DebugElement;
  let timerEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [HttpClientTestingModule],
      providers: [GameService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should 'Play' button be visible on loading of the component", () => {
    onPlayEl = fixture.debugElement.query(By.css('.btn-play'));
    expect(onPlayEl).toBeTruthy();
  });

  /* it("should 'Play' button be not visible when user clicks on 'Play'", async(() => {
  })); */

  it("should call 'onPlay' function when user clicks on 'Play'", () => {
    spyOn(component, 'onPlay');
    fixture.detectChanges();
    onPlayEl = fixture.debugElement.query(By.css('.btn-play'));
    onPlayEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onPlay).toHaveBeenCalled();
  });

  it('should timer be not visible on loading of the component', () => {
    timerEl = fixture.debugElement.query(By.css('h2'));
    expect(timerEl).toBeFalsy();
  });

  it("should timer be visible on clicking 'Play' button", () => {
    fixture.debugElement
      .query(By.css('.btn-play'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    timerEl = fixture.debugElement.query(By.css('h2'));
    expect(timerEl).toBeTruthy();
  });

  it('should call getGameDetails (in GameService) and get user details object as response', fakeAsync(() => {
    const service = fixture.debugElement.injector.get(GameService);
    let spy_getGameDetails = spyOn(service, 'getGameDetails').and.callFake(
      () => {
        return Rx.of({
          results: {
            'User-1': { present: false },
            'User-2': { present: false },
          },
          sentence:
            'Giving directions that the mountains are to the west only works when you can see them.',
          user: [{ name: 'User-1' }, { name: 'User-2' }],
        }).pipe(delay(100));
      }
    );
    component.ngOnInit();
    tick(100);
    expect(component.gameSentence).toEqual(
      'Giving directions that the mountains are to the west only works when you can see them.'
    );
    expect(component.usersLists.length).toEqual(2);
  }));
});

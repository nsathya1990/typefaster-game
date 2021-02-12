import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormattedTimePipe } from '../../pipes/formatted-time.pipe';

import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultComponent, FormattedTimePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    component.user = { name: 'User-1', timeTaken: 12098 };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render the winner's user name", () => {
    el = fixture.debugElement.query(By.css('h1'));
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('User-1');
  });

  it("should render the winner's time message", () => {
    el = fixture.debugElement.query(By.css('.result-formatted-time'));
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Time: 12s:98ms');
  });
});

import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './shared/loader/loader.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        GameComponent,
        LoaderComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the child component (HeaderComponent)', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  }));

  it('should have the child component (GameComponent)', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-game')).toBeTruthy();
  }));

  it("should have 'user' property of the component set when 'setUserInfo' function is called passing the user value", () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    const user = { name: 'User-1' };
    component.setUserInfo(user);
    expect(component.user.name).toEqual('User-1');
  });
});

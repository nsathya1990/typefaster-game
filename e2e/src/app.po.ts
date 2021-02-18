import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-header .game-title')).getText() as Promise<string>;
  }

  getSubTitleText(): Promise<string> {
    return element(by.css('header .user-info')).getText() as Promise<string>;
  }
}

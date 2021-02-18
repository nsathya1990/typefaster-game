import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Landing page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display game title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Typefaster');
  });

  it('should display game sub-title', () => {
    page.navigateTo();
    expect(page.getSubTitleText()).toEqual('Speed Wins! Go for it!!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});

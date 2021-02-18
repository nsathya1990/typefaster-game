import { AppPage } from './app.po';
import { element, by } from 'protractor';

describe('Game Component page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display either play or reset button', () => {
    const btnElem = element(by.css('.btn'));
    expect(btnElem.isPresent()).toBeTruthy();
  });

  it('should reset if slot is not available', () => {
    const btnElem = element(by.css('.btn'));
    btnElem.getText().then((btnText) => {
      if (btnText === 'RESET GAME') {
        btnElem.click();
        const newBtnElem = element(by.css('[type="button"]'));
        expect(newBtnElem.getText()).toEqual('PLAY');
      } else {
        expect(btnElem.getText()).toEqual('PLAY');
      }
    });
  });
});

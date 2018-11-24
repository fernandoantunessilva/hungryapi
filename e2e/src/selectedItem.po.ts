import { browser, by, element } from 'protractor';

export class SelectedItemPage {
  navigateTo() {
    return browser.get('/new-burguer');
  }

  getParagraphText() {
    return element(by.css('h5')).getText();
  }

  getElementById(id: string) {
    return element(by.id(id));
  }

  getElementByClass(c: string) {
    return element.all(by.css(c));
  }

  getAllElementsByClass(c: string) {
    return element.all(by.css(c));    
  }
}
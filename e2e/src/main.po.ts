import { browser, by, element } from 'protractor';

export class MainPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('h1')).getText();
  }

  getItemsFromMenu() {
    return element.all(by.css(".card")).count();
  }
  
  getPriceItems() {
      return element.all(by.css(".badge-success"));
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

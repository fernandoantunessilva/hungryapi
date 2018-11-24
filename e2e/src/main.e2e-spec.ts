import { MainPage } from './main.po';
import { browser, by, element } from 'protractor';

describe('MainPage', () => {
  let page: MainPage;

  beforeEach(() => {
    page = new MainPage();
  });

  it('deve verificar se o título foi definido corretamente', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Seja bem vindo ao iHungry');
  });

  it('deve verificar se o número de itens do cardápio esta correto', () => {
    page.navigateTo();
    expect(page.getItemsFromMenu()).toEqual(4);
  });

  it('deve verificar se os valores dos itens são maior que 0 (zero)', () => {
    page.navigateTo();
    let items = page.getPriceItems();
    items.each(function(element, index) {
      element.getText().then(function (text) {
        expect(parseFloat(text.replace('R$ ','').replace(',','.'))).toBeGreaterThan(0);
      });
    });
  });

  it('deve selecionar cada item do cardapio e verificar se a seleção está correta', () => {
    page.navigateTo(); 
    let cards = page.getElementByClass('.card-title');
    cards.each(function(el, i){ 
      cards.get(i).getText().then(function(text){ 
        browser.executeScript('window.scrollTo(0,10000);').then(function () { 
          element(by.id("btn-" + i)).click().then(function(){
            element(by.css('.card-title-selected')).getText().then(function(t){              
              element(by.css('.my-2')).click().then(function(){
                expect(text).toEqual(t);
              });
            })
          });
        });
      });      
    });  
  });
});

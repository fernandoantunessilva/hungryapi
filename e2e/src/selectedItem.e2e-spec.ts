import { SelectedItemPage } from './selectedItem.po';
import { by, element } from 'protractor';

describe('SelectedItemPage', () => {
  let page: SelectedItemPage;

  beforeEach(() => {
    page = new SelectedItemPage();
  });

  it('deve verificar se o título foi definido corretamente', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hambúrguer clássico, sem frescuras');
  });

  it('deve verificar se o valor do desconto é 0 (zero)', () => {
    page.navigateTo();      
    element(by.css('.discount')).getText().then(function(text) {
        expect(parseFloat(text.replace('R$ ','').replace(',','.'))).toEqual(0);
    });
  });

  it('deve verificar se o valor total é 0 (zero)', () => {
    page.navigateTo();       
    element(by.css('.total')).getText().then(function(text) {
        expect(parseFloat(text.replace('R$ ','').replace(',','.'))).toEqual(0);
    });
  });

  it('deve adicionar um ingrediente e checar a promoção Light ativada', () => {
    page.navigateTo(); 
    element(by.cssContainingText('option', 'Alface')).click().then(function() {
        element(by.css('.btn-add')).click();
        
        expect(element(by.css('.light')).isPresent()).toBeTruthy();
    });      
  });

  it('deve adicionar ingredientes e checar a promoção Muito queijo ativada', () => {
    page.navigateTo();
    element(by.cssContainingText('option', 'Queijo')).click().then(function() {
        element(by.css('.btn-add')).click().then(function(){
            element(by.css('.btn-add')).click().then(function(){
                element(by.css('.btn-add')).click().then(function(){
                    expect(element(by.css('.lot-Of-cheese')).isPresent()).toBeTruthy();
                });
            });
        });
    });      
  });

  it('deve adicionar ingredientes e checar a promoção Muita Carne ativada', () => {
    page.navigateTo();
    element(by.cssContainingText('option', 'Hambúrguer de carne')).click().then(function() {
        element(by.css('.btn-add')).click().then(function(){
            element(by.css('.btn-add')).click().then(function(){
                element(by.css('.btn-add')).click().then(function(){
                    expect(element(by.css('.lot-of-meat')).isPresent()).toBeTruthy();
                });
            });
        });        
    });      
  });

  it('deve adicionar ingredientes e checar o total e o desconto', () => {
    page.navigateTo();
    let totalIngredients = 0;
    let _total = 0
    let _discount = 0;
    element(by.cssContainingText('option', 'Queijo')).click().then(function() {
        element(by.css('.btn-add')).click().then(function(){
            element(by.css('.btn-add')).click().then(function(){
                element(by.css('.btn-add')).click().then(function(){
                    element(by.cssContainingText('option', 'Hambúrguer de carne')).click().then(function() {
                        element(by.css('.btn-add')).click().then(function(){
                            element(by.css('.btn-add')).click().then(function(){
                                element(by.css('.btn-add')).click().then(function(){
                                    let ingredients = element.all(by.css('.ingredient'));
                                    ingredients.each(function(el, i){
                                        ingredients.get(i).getText().then(function(text){                                            
                                            totalIngredients += parseFloat(text.split('-')[1].trim().replace('R$ ','').replace(',','.'));
                                            element(by.css('.total')).getText().then(function(total) {
                                                element(by.css('.discount')).getText().then(function(discount) {
                                                    _total = parseFloat(total.replace('R$ ','').replace(',','.'));
                                                    _discount = parseFloat(discount.replace('R$ ','').replace(',','.'));                                                    
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });                        
                    }); 
                });
            });
        });
    });
    
    expect(totalIngredients).toEqual(_total + _discount);
  });
});

import { Component, OnInit } from "@angular/core";
import { MenuService } from "../core/menu/menu.service";
import { ActivatedRoute, Params } from "@angular/router";
import { SelectedItem } from "./selected-item.model";
import { IngredientService } from "../core/ingredients/ingredient.service";
import { Ingredient } from "./ingredient.model";

@Component({
    selector: 'app-selected-item',
    templateUrl: 'selected-item.component.html',
    styleUrls:['selected-item.component.css']
  })
  export class SelectedItemComponent implements OnInit {
  
    menu: any = []; formatter: any;
    id: number;
    selectedItem: SelectedItem = new SelectedItem();
    ingredients: Array<Ingredient> = new  Array<Ingredient>();
    total: string; discount:string;
    selectedIngredient: number;
    lightPromotionActived:boolean; lotOfMeatActived: boolean; lotOfCheeseActived: boolean; isNew: boolean;
    
    constructor(
        private menuService: MenuService, 
        private ingredientService: IngredientService,
        private route : ActivatedRoute) {
        this.route.params
        .subscribe((params : Params) => {
            this.id = params["id"];            
        });
        this.isNew = !this.id;
        this.formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
        this.selectedItem.ingredients = new Array<Ingredient>();
    }
  
    ngOnInit() {
        this.ingredientService.getIngredientes()
            .subscribe(result => {            
                result.forEach(el => {
                    el.priceLabel= this.formatter.format(el.price);
                });
                this.ingredients = result;
                if(this.id) {
                    this.menuService.getItemById(this.id)
                    .subscribe(result => {
                        result.ingredients.forEach(el => {
                            el.priceLabel = this.formatter.format(el.price);
                            el.newId = this.newGuid();
                        });
                        this.selectedItem = result;
                        this.calculateTotalAndDiscount(); 
                    });
                } else {                    
                    this.total = this.formatter.format(0);
                }                            
        });
        this.discount = this.formatter.format(0);
    }
    
    selectIngredient(selectedValue: any) {
        this.selectedIngredient = selectedValue;
    }

    addIngredient($event){
        $event.preventDefault();
        if(this.selectedIngredient){
            let ingredient = Object.assign({}, this.ingredients.find(x=>x.id == this.selectedIngredient));
            ingredient.newId = this.newGuid();
            this.selectedItem.ingredients.push(ingredient);
            this.calculateTotalAndDiscount();            
        }        
    }

    removeIngredient(id: string) {
        this.selectedItem.ingredients = this.selectedItem.ingredients.filter(item => item.newId !== id);
        this.calculateTotalAndDiscount();
    }    

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
            return v.toString(16);
        });
    }

    calculateTotalAndDiscount() {
        let _discount = 0;
        let _total = 0;

        this.selectedItem.ingredients.forEach(el => {
            _total += el.price;            
        });

        const hasLettuce = this.selectedItem.ingredients
            .filter(item => item.name === 'Alface');
        
        const hasBacon = this.selectedItem.ingredients
            .filter(item => item.name === 'Bacon');

        const cheese = this.selectedItem.ingredients
            .filter(item => item.name === 'Queijo');
        
        const meat = this.selectedItem.ingredients
            .filter(item => item.name === 'Hambúrguer de carne');
        
        let discountCheese = Math.trunc(cheese.length / 3);
        const cheesePrice = this.ingredients.find(x => x.name == 'Queijo').price;
        
        let discountMeat = Math.trunc(meat.length / 3);
        const meatPrice = this.ingredients.find(x => x.name == 'Hambúrguer de carne').price;
        
        _discount += (discountCheese * cheesePrice);
        _discount += (discountMeat * meatPrice);

        _total = (_total - _discount);

        if(hasLettuce.length > 0 && hasBacon.length === 0){
            const discountFromLight = ((_total * 10) / 100);
            _total = (_total - discountFromLight);
            _discount += discountFromLight;
            this.lightPromotionActived = true;            
        } else {
            this.lightPromotionActived = false;
        }

        this.discount = this.formatter.format(_discount);
        this.total = this.formatter.format(_total);

        this.lotOfCheeseActived = (discountCheese > 0);
        this.lotOfMeatActived = (discountMeat > 0);
    }
  }
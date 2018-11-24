import { Component, OnInit } from "@angular/core";
import { MenuService } from "../core/menu/menu.service";

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls:['main.component.css']
  })
  export class MainComponent implements OnInit {
  
    menu: any = [];

    constructor(private menuService: MenuService) { }
  
    ngOnInit() {

        let formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        })

        this.menuService.getMenu()
        .subscribe(result => {            
            this.menu = result; 
            this.menu.forEach(el => {
                el.ingredientLabel = el.ingredients.map(a => a.name).join(', ');
                el.price = formatter.format(el.price);
            });
        });
    }  
  }
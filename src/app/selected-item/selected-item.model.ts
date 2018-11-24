import { Ingredient } from "./ingredient.model";

export class SelectedItem {
    id: number;
    name: string;
    price:number;
    ingredients: Array<Ingredient>;
  }
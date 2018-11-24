import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { MainComponent } from './main/main.component';
import { MenuService } from './core/menu/menu.service';
import { HttpModule } from '@angular/http';
import { SelectedItemComponent } from './selected-item/selected-item.component';
import { IngredientService } from './core/ingredients/ingredient.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SelectedItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    UiModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  providers: [
    MenuService,
    IngredientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

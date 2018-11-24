import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SelectedItemComponent } from './selected-item/selected-item.component';


export const routes: Routes = [
    {
      path: '',
      redirectTo: 'main',
      pathMatch: 'full'
    },
    {
      path: 'main',
      component: MainComponent
    },
    {
      path: 'selected-item/:id', 
      component: SelectedItemComponent, 
      pathMatch: 'full'
    },
    {
      path: 'new-burguer', 
      component: SelectedItemComponent, 
      pathMatch: 'full'
    }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
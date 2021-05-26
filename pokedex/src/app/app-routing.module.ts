import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home/:index',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'home/:index/https:/pokeapi.co/api/v2/ability/:abi',
    loadChildren: () => import('./abi-details/abi-details.module').then( m => m.AbiDetailsPageModule)
  },
  {
    path: 'home/:index/https:/pokeapi.co/api/v2/move/:mov',
    loadChildren: () => import('./mov-details/mov-details.module').then( m => m.MovDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

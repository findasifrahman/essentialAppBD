import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  /*{
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'list-detail', loadChildren: './list-detail/list-detail.module#ListDetailPageModule' },*/
  { path: 'tabs-page', loadChildren: './tabs-page/tabs-page.module#TabsPagePageModule' },
  { path: 'category', loadChildren: './ledgercategoy/ledgercategoy.module#LedgercategoyPageModule' },
  { path: 'ledger/:category_id', loadChildren: './ledger/ledger.module#LedgerPageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule', canLoad: [CheckTutorial] },
  //{ path: 'map', loadChildren: './map/map.module#MapPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

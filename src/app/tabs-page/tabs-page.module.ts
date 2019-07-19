import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { IonicModule } from '@ionic/angular';

import { TabsPagePage } from './tabs-page.page';
import { ListPage } from '../list/list.page';
import { ListPageModule } from '../list/list.module';

import { ListDetailPage } from '../list-detail/list-detail.page';
import { AboutPageModule } from '../about/about.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPagePage,
    children:[
      {
        path: 'list',
        children: [
          {
            path: '',
            component: ListPage,
          },
          {
            path: 'list-detail/:listId',
            component: ListDetailPage
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs-page/tabs/list',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadChildren: '../about/about.module#AboutPageModule'
      },
      {
        path: 'map',
        loadChildren: '../map/map.module#MapPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //TabsPagePage,
    AboutPageModule,
    ListPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPagePage,
    ListDetailPage],
  providers:[
    SQLite,
    SQLitePorter,
  ]//SQLiteObject]
})
export class TabsPagePageModule {}

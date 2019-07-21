import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import 'hammerjs';

import { IonicModule } from '@ionic/angular';

import { LedgercategoyPage } from './ledgercategoy.page';
import { LedgerCategoryPopOverFormPage } from './ledgercategorypopoverform/ledgercategorypopoverform.page';
const routes: Routes = [
  {
    path: '',
    component: LedgercategoyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LedgercategoyPage,LedgerCategoryPopOverFormPage],
  entryComponents: [LedgerCategoryPopOverFormPage],
  providers:[
    SQLite,
    SQLitePorter,
    DatePipe
  ]//SQLiteObject]
})
export class LedgercategoyPageModule {}

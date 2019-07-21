import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';


import { IonicModule } from '@ionic/angular';

import { LedgerPage } from './ledger.page';
import { LedgerPopOverFormPage } from './ledgerpopoverform/ledgerpopoverform.page';

const routes: Routes = [
  {
    path: '',
    component: LedgerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LedgerPage,LedgerPopOverFormPage],
  entryComponents: [LedgerPopOverFormPage],
  providers:[
    SQLite,
    SQLitePorter,
    DatePipe
  ]//SQLiteObject]
})
export class LedgerPageModule {}

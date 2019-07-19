import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TutorialPage } from './tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //IonicStorageModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [TutorialPage],
  entryComponents: [TutorialPage],
})
export class TutorialPageModule {}

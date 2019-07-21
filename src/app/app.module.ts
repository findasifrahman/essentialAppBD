import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

import { TabsPagePageModule } from './pages/tabs-page/tabs-page.module';
import { LedgercategoyPageModule } from './pages/ledgercategoy/ledgercategoy.module';
import { LedgerPageModule } from './pages/ledger/ledger.module';
import { TutorialPageModule } from './tutorial/tutorial.module';
import { CheckTutorial } from './providers/check-tutorial.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),    
    AppRoutingModule,
    TabsPagePageModule,
    HttpModule,
    HttpClientModule,
    LedgercategoyPageModule,
    LedgerPageModule,
    //TutorialPageModule
    
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions,
    CheckTutorial
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

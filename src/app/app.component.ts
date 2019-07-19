import { Component } from '@angular/core';

import { Platform,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Contacts',
      url: '/tabs-page/tabs',
      icon: 'list'
    },
    {
      title: 'Simple Accounting',
      url: '/category',
      icon: 'book'
    }
  ];

  constructor(
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private storage: Storage,
    private router: Router
  ) {

    this.initializeApp();
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
      /*platform.ready().then(() => {

        androidPermissions.requestPermissions(
          [
            androidPermissions.PERMISSION.CAMERA, 
            androidPermissions.PERMISSION.CALL_PHONE, 
            androidPermissions.PERMISSION.GET_ACCOUNTS, 
            androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
            androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
          ]
        );
      }) */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}

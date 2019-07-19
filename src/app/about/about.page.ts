import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../popover/popover.page';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  conferenceDate = '2047-05-17';
  constructor(public popoverCtrl: PopoverController) { }

  ngOnInit() {
  }
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
}

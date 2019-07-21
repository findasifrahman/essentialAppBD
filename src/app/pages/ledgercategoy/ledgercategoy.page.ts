import { Component, OnInit,OnChanges, AfterViewInit } from '@angular/core';
import { PopoverController,AlertController,ToastController  } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { LedgerCategoryPopOverFormPage } from './ledgercategorypopoverform/ledgercategorypopoverform.page';
import {  ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-ledgercategoy',
  templateUrl: './ledgercategoy.page.html',
  styleUrls: ['./ledgercategoy.page.scss'],
})
export class LedgercategoyPage implements OnInit {
  items:any;
  async presentToast(val:string) {
    const toast = await this.toastController.create({
      message: val,
      duration: 5000
    });
    toast.present();
  }
  async presentAlertConfirm(itemid) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion of this data!',
      message: 'Delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.dservice.deleteLedgerCategory(itemid);
            this.getAllItems();
          }
        }
      ]
    });

    await alert.present();
  }
  constructor( private popoverCtrl: PopoverController,private dservice:DatabaseService,
    public toastController: ToastController,private route: ActivatedRoute,private alertController:AlertController) {
      route.params.subscribe(val => {
        this.getAllItems();
      });
  }

  ngOnInit() {
  }
  popover;
  async addForm(even){
      this.popover = await this.popoverCtrl.create({
        component: LedgerCategoryPopOverFormPage,
        //event: even
      });
      await this.popover.present();

     this.popover.onDidDismiss(() => {
     }).then(v=>{
       ////
        this.getAllItems();
       ////
       console.log("dismissed");
     })
  }
  getAllItems(){
    this.dservice.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        console.log("db ready led cat");
        this.dservice.loadledgerCatagory().then(devs=>{
          console.log(devs);
          this.items = devs;
        }).catch(err=>{console.log(err)}) 
      }
    });
  }
  async rmclicked(itemid){

    await this.presentAlertConfirm(itemid).then(ev=>{
      //this.dservice.deleteLedgerCategory(itemid);
      //this.getAllItems();
    });
  }

}

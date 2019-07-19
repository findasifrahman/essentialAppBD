import { Component, OnInit} from '@angular/core';
import { PopoverController,AlertController,ToastController  } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { LedgerPopOverFormPage } from '../ledgerpopoverform/ledgerpopoverform.page';
import {  ActivatedRoute,Router } from '@angular/router'


@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
})
export class LedgerPage implements OnInit {
  items:any;
  category_id;
  total: number = 0;
  content_name: string;
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
            this.dservice.deletCategory(itemid);
            this.getAllItems();
          }
        }
      ]
    });

    await alert.present();
  }
  constructor( private popoverCtrl: PopoverController,private dservice:DatabaseService,
    public toastController: ToastController,private route: ActivatedRoute,private router: Router,private alertController:AlertController) {
      route.params.subscribe(val => {
        this.getAllItems();
      });
    
  }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.category_id = val["category_id"];
      this.dservice.getLedgerCategory(this.category_id).then(val=>{
        this.content_name = val["catagory_name"];
      })
      this.getAllItems();
    });
  
  }
  popover;
  async addForm(even){
      this.popover = await this.popoverCtrl.create({
        component: LedgerPopOverFormPage,
        componentProps:{key1: this.category_id}
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
        console.log("db ready led all");
        console.log(Number(this.category_id));
        this.dservice.loadCatagory(Number(this.category_id)).then(devs=>{
          console.log(devs);
          this.items = devs;
          this.total = devs.reduce((tot,arr)=> {
            return tot + Number(arr["spent"]);
            //this.total = Number(tot);
            //console.log(this.total);
          },0)
        }).catch(err=>{console.log(err)}) 
      }
    });
  }
  async rmclicked(itemid){

    await this.presentAlertConfirm(itemid).then(ev=>{

    });
  }
}

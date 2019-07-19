import { Component, OnInit,OnChanges, AfterViewInit } from '@angular/core';
import { PopoverController,AlertController,ToastController  } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { PopOverFormPage } from '../popoverform/popoverform.page';
import { ActivatedRoute } from '@angular/router'
export interface mv {
  id: string,img: string
  title: string,note: string,tracks: string[]
}
export interface mygr {
  groupId: string,
  name: string,
  groupItem: mv[]
}
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit,AfterViewInit,OnChanges {
  private selectedItem: any;
  items = [
    {
        groupId: '1',
        name: 'Emergancy Numbers',
        groupItem: [
          {
            id: '1',img: 'assets/images/police.png',
            title: 'Bangladesh Police',note: '999',"tracks": ["Police"]
          },
          {
            id: '2',img: 'assets/images/ienSalish.png',//img_bg: 'assets/images/ienSalish_bg.png',
            title: 'Ien & Salish Center',note: '999',"tracks": ["Food"]
          },
          {
          id: '3',img: 'assets/images/fireService.png',//img_bg: 'assets/images/fireService_bg.png',
          title: 'Fire Service',note: '999',"tracks": ["Ionic"]
          },
        ]
    },
    {
        groupId: '2',
        name: 'Important Numbers',
        groupItem:[
          {
            id: '4',img: 'assets/images/dudok.png',//img_bg: 'assets/images/dudok_bg.png',
            title: 'Dudok',note: '999',"tracks": ["Ionic"]
          },
          {
            id: '5',img: 'assets/images/dpdc.png',//img_bg: 'assets/images/dpdc_bg.png',
            title: 'DPDC',note: '999',"tracks": ["Ionic"]
          },
          /*{
            id: '6',img: 'assets/images/desco.png',
            title: 'DESCO',note: '999',"tracks": ["Ionic"]
          },
          {
            id: '7',img:  'assets/images/bangladeshBank.png',
            title: 'Bangladesh Bank',note: '999',"tracks": ["Ionic"]
          }*/
        ]
    }
  ];
  async presentToast(val:string) {
    const toast = await this.toastController.create({
      message: val,
      duration: 5000
    });
    toast.present();
  }
  constructor( private popoverCtrl: PopoverController,private dservice:DatabaseService,
    public toastController: ToastController,private route: ActivatedRoute) {
      route.params.subscribe(val => {
        this.getAllItems();
      });
  }

  ngOnInit() {
    console.log("inited");
    //this.dservice.loadNumbers();
  }
  ngOnChanges(){
    console.log("changed");
  }
  ngAfterViewInit(){    
   
  }
  popover;
  async addForm(even){

      this.popover = await this.popoverCtrl.create({
        component: PopOverFormPage,
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
    while(this.items.length > 2){
      this.items.pop();
    }
    this.dservice.getDatabaseState().subscribe(rdy => {
      console.log("navigate changes");
      if (rdy) {
        console.log("db ready");
        this.dservice.loads().then(devs=>{
          console.log(devs);
          let grs = {} as mygr;
          if (devs.length > 0) {
            grs.groupId = '3';
            grs.name = 'Other num'; 
            grs.groupItem = [];
            for (var i = 0; i < devs.length; i++) {             
              grs.groupItem.push({
                id: devs[i].id.toString(),img: 'assets/images/a.png',
                title: devs[i].name,note: devs[i].phone,tracks: ["Ionic"]
              })
              if(i == (devs.length -1)){
                this.items.push(grs);
                console.log(grs);
              }
            }
            //this.items.push()
          }
        }).catch(err=>{console.log(err)}) 
      }
    });
  }
}

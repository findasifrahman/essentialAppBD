import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { ToastController  } from '@ionic/angular';
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  session: any;
  isFavorite = false;
  defaultHref = '';
  img = "";
  number = "";
  name = "";
  showRemove = false;
  async presentToast(val:string) {
    const toast = await this.toastController.create({
      message: val,
      duration: 5000
    });
    toast.present();
  }
  constructor(
    private route: ActivatedRoute,private dservice:DatabaseService,public toastController: ToastController,
    private router: Router
  ) {
    this.route.queryParams.subscribe(qpar=>{
      const grn = qpar["grid"];
      const id = qpar["listId"];
      console.log("query--");
      console.log(grn);
      if(Number(grn)<3){
        this.items.forEach(v=> {          
              v.groupItem.forEach(g => {
              if(g.id==id){
                this.img = g.img_bg;
                this.number = g.note;
                this.name = g.title;
              }
            }
          )       
      })
     }
     else{
      this.showRemove = true;
      this.dservice.getNumber((Number(id)).toString()).then(av=>{
        console.log(av);
        console.log((Number(id)).toString());
        this.img = 'assets/images/aBig.png';
        this.number = av["phone"];
        this.name = av["name"];
      });
     }
    })
    /*this.route.params.subscribe(params => {
      const id = params["listId"];
      const grn = params["grid"];
      console.log("ma val--");
      console.log(id);
      console.log(grn);
      if(Number(id) > 0 && Number(id) <=5){
        this.items.forEach(v=> v.groupItem.forEach(g => {
            if(g.id==id){
              this.img = g.img;
              this.number = g.note;
              this.name = g.title;
            }
         }
        ))

      }
      else{
          this.dservice.getNumber((Number(id)-5).toString()).then(av=>{
            console.log(av);
            console.log((Number(id)).toString());
            this.img = 'assets/images/aBig.png';
            this.number = av["phone"];
            this.name = av["name"];
          });

      }
    })*/
  }
  removeNum(){
    this.dservice.deleteNumbers(this.name).then(val=>{
      this.router.navigate(["/tabs-page/tabs/list"])
      console.log("success Delete");
      this.presentToast("Successfully deleted");

    }).catch(err=>{console.log(err)})
  }
  sessionClick(item: string) {
    console.log('Clicked', item);
  }
 
  ionViewDidEnter() {
    this.defaultHref = `/tabs-page/tabs/list`;
  }


  ngOnInit() {
  }
  items = [
    {
        groupId: '1',
        name: 'Emergancy Numbers',
        groupItem: [
          {
            id: '1',img: 'assets/images/police.png',img_bg: 'assets/images/police_bg.png',
            title: 'Bangladesh Police',note: '999',"tracks": ["Police"]
          },
          {
            id: '2',img: 'assets/images/ienSalish.png',img_bg: 'assets/images/ienSalish_bg.jpg',
            title: 'Ien & Salish Center',note: '999',"tracks": ["Food"]
          },
          {
          id: '3',img: 'assets/images/fireService.png',img_bg: 'assets/images/fireService_bg.png',
          title: 'Fire Service',note: '999',"tracks": ["Ionic"]
          },
        ]
    },
    {
        groupId: '2',
        name: 'Important Numbers',
        groupItem:[
          {
            id: '4',img: 'assets/images/dudok.png',img_bg: 'assets/images/dudok_bg.jpg',
            title: 'Dudok',note: '999',"tracks": ["Ionic"]
          },
          {
            id: '5',img: 'assets/images/dpdc.png',img_bg: 'assets/images/dpdc_bg.png',
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
}

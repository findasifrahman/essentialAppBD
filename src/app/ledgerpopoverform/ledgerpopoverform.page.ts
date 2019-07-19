import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PopoverController,AlertController,ToastController, NavParams  } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  template: `
    <ion-content>
      <form [formGroup]="todo" (ngSubmit)="logForm()">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
            <ion-item>
              <ion-label position="stacked">Activity Name <ion-text color="danger">*</ion-text></ion-label>
              <ion-input required type="text" formControlName="activityName"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Spent <ion-text color="danger">*</ion-text></ion-label>
                <ion-input required type="number" formControlName="spent"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Date <ion-text color="danger">*</ion-text></ion-label>
                <ion-input required type="date" formControlName="mdate"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Time <ion-text color="danger">*</ion-text></ion-label>
                <ion-input required type="text" formControlName="mtime"></ion-input>
             </ion-item>
             <ion-item>

                <ion-input required type="number" formControlName="catagory_id" hidden></ion-input>
            </ion-item>
            <div class="ion-padding">
              <ion-button expand="block" type="submit" [disabled]="!todo.valid" class="ion-no-margin">Add</ion-button>
            </div>

        </ion-list>
      </form>
    </ion-content>
    
  `
})
export class LedgerPopOverFormPage {
    private c_id;
  private todo : FormGroup;
  constructor(public popoverCtrl: PopoverController,private formBuilder: FormBuilder, private router:Router,
    private dservice:DatabaseService,private alertCtrl: AlertController,public toastController: ToastController,
    public navParams: NavParams) {
    console.log("cur date");
    console.log(this.navParams.get('key1'));
    this.c_id = this.navParams.get('key1');
    console.log(new Date().toUTCString());
        this.todo = this.formBuilder.group({
        activityName: ['', Validators.required],
        spent: ['', Validators.required],
        mdate: [new Date().toISOString().substring(0, 10), Validators.required],
        mtime: [new Date().toISOString().substring(11,16), Validators.required],
        catagory_id: [this.navParams.get('key1')]
    });
  }
  async presentToast(val:string) {
    const toast = await this.toastController.create({
      message: val,
      duration: 3000
    });
    toast.present();
  }

  logForm(){
    this.presentToast('submitted');
    console.log(this.todo.value.catagory_name);
    this.dservice.addCategory(this.todo.value.activityName,this.todo.value.spent,this.todo.value.mdate,
        this.todo.value.mtime,this.c_id).
      then(val => {
        this.presentToast('successfully created');
        this.router.navigate(['/category']);
        this.popoverCtrl.dismiss();
    }).catch(err => this.presentToast(err));
  }

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}

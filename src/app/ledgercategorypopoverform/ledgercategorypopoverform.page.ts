import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PopoverController,AlertController,ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  template: `
    <ion-content>
      <form [formGroup]="todo" (ngSubmit)="logForm()">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
            <ion-item>
              <ion-label position="stacked">Category Name <ion-text color="danger">*</ion-text></ion-label>
              <ion-input required type="text" formControlName="catagory_name"></ion-input>
            </ion-item>
            <div class="ion-padding">
              <ion-button expand="block" type="submit" [disabled]="!todo.valid" class="ion-no-margin">Add</ion-button>
            </div>

        </ion-list>
      </form>
    </ion-content>
    
  `
})
export class LedgerCategoryPopOverFormPage {
  private todo : FormGroup;
  constructor(public popoverCtrl: PopoverController,private formBuilder: FormBuilder, private router:Router,
    private dservice:DatabaseService,private alertCtrl: AlertController,public toastController: ToastController) {
    this.todo = this.formBuilder.group({
      catagory_name: ['', Validators.required]
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
    this.dservice.addLedgerCategory(this.todo.value.catagory_name).
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

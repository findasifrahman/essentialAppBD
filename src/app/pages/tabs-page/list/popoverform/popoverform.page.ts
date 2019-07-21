import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PopoverController,AlertController,ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../../../../services/database.service';

@Component({
  template: `
    <ion-content>
      <form [formGroup]="todo" (ngSubmit)="logForm()">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
            <ion-item>
              <ion-label position="stacked">Name <ion-text color="danger">*</ion-text></ion-label>
              <ion-input required type="text" formControlName="name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Phone <ion-text color="danger">*</ion-text></ion-label>
              <ion-input required formControlName="phone"></ion-input>
            </ion-item>
            <div class="ion-padding">
              <ion-button expand="block" type="submit" [disabled]="!todo.valid" class="ion-no-margin">Add</ion-button>
            </div>

        </ion-list>
      </form>
    </ion-content>
    
  `
})
export class PopOverFormPage {
  private todo : FormGroup;
  constructor(public popoverCtrl: PopoverController,private formBuilder: FormBuilder, private router:Router,
    private dservice:DatabaseService,private alertCtrl: AlertController,public toastController: ToastController) {
    this.todo = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      image: ['']
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
    console.log(this.todo.value.name);
    this.dservice.addNumber(this.todo.value.name,this.todo.value.phone,this.todo.value.image).
      then(val => {
        this.presentToast('successfully created');
        this.router.navigate(['tabs-page/tabs/list']);
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartupPage } from '../startup/startup';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {
  number;
  data = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public accountsProvider:AccountsProvider,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');
  }
  get_images(){
    this.accountsProvider.get_images(this.number).subscribe((res:any)=>{
      this.data=res;
      console.log(res);
  })}
  logout(){
    this.accountsProvider.logout().subscribe(res=>{
      this.navCtrl.popToRoot();
    },
    err => {
      this.showAlert("you are not logged in");
    }
  );
  }
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: message,
      buttons: ['OK']

    });
    
    alert.present();
  }

}

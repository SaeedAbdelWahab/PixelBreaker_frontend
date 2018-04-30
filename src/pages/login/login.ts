import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { TabsPage } from '../tabs/tabs';
import { Home2Page } from '../home2/home2';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  data;
  constructor(public navCtrl: NavController,public accountsProvider:AccountsProvider, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(data){
    this.data = data;
    this.accountsProvider.login(JSON.stringify(data.value)).subscribe((res:any)=>{
      if (res.staff){
        this.navCtrl.push(TabsPage,{
          email : this.data.value.username,
          password : this.data.value.password
        })
      }
      else {
        this.navCtrl.push(Home2Page);
      }
      

    },
    err => {
      this.showAlert("Wrong username or password");
    }
  );
  }
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Errors',
      subTitle: message,
      buttons: ['OK']

    });
    alert.present();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { RegisterPage } from '../register/register';
import { TabsPage} from '../tabs/tabs';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { Home2Page } from '../home2/home2';



/**
 * Generated class for the StartupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public accountsProvider:AccountsProvider) {
    this.test();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartupPage');
  }

  goToSignup(){
    this.navCtrl.push(RegisterPage);
  }
  goToSignIn(){
    this.navCtrl.push(LoginPage);
  }
  test(){
    
    this.accountsProvider.test().subscribe((res:any)=>{
      if (res.is_staff){
        this.navCtrl.push(TabsPage,{
        })
      }
      else {
        this.navCtrl.push(Home2Page)
      }

    },
    err => {
      console.log("you are not signed in");
    }
  );
  }
  

}

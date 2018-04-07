import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  data ;
  messages:any;
  message_body:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public accountsProvider:AccountsProvider,public alertCtrl:AlertController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(data){
    this.data = data;
    this.accountsProvider.register(JSON.stringify(data.value)).subscribe(res=>{
      this.createAlert("Congrats your account was created!");

    },
    err => {
      this.messages = {
        "email":err.error.email,
        "password":err.error.password
      }
      if (this.messages.email && this.messages.password){
        
      }
      else{
        if (this.messages.email){
          this.messages = {
            "password":"No errors \n",
            "email":err.error.email+"\\\\",
          }
        }
        else{
          this.messages = {
            "email":"No errors \n. \\\\",
            "password":err.error.password,
          }
        }

      }
      this.showAlert(this.messages);
    

    }
  );
  }
  showAlert(message) {
    
       
    let alert = this.alertCtrl.create({
      title: 'Error!',
      
      message:"Email : "+message.email+"     "+ "Password : "+message.password,
  
      buttons: ['OK']

    });
    alert.present();
  }

  createAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Congrats!',
      subTitle: message,
      buttons: [{
        text: "Ok",
        handler :()=>{
          this.navCtrl.push(LoginPage,{
            email : this.data.value.email,
            password : this.data.value.password
          })
        }
      }]
    });
    alert.present();
  }

}

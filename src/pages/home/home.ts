import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { StartupPage } from '../startup/startup';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imgUrl;
  imageName;
  url;
  constructor(public navCtrl: NavController,public accountsProvider:AccountsProvider,public alertCtrl:AlertController,public camera: Camera,public http:HttpClient) {

  }
  pic(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    
    this.camera.getPicture(options).then((imageData) => {
     this.imageName = imageData;
     this.imgUrl = 'data:image/jpeg;base64,' + imageData;
     this.transferData()

    }, (err) => {
     // Handle error
    });
  }
  transferData(){
    let formData = new FormData();
    // formData.append('category', 1);
    // formData.append('status', 'Y');
    formData.append('image', this.imageName); 
    formData.append('number','5');
    this.http.post("http://192.168.1.5:8000/api-imageUpload", formData, {withCredentials: true}).subscribe((res:any) => {
        
        this.url = res.path
        
        var message = "The image was successfully uploaded!"+this.url;
        this.showAlert(message);
      
      
    }, (err) => {
      var message = "Error in uploading file " + err.errors;
      this.showAlert(message);
    });
  }
  

  logout(){
    this.accountsProvider.logout().subscribe(res=>{
      this.navCtrl.push(StartupPage);
      
    },
    err => {
      this.showAlert("you are not logged in");
    }
  );
  }
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK']

    });
    
    alert.present();
  }

}

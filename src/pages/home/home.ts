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
  number;
  imgResult;
  show = false;
  show_reading = false;
  show_res=false;
  reading ;
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
     this.show=true;
     this.imgUrl = 'data:image/jpeg;base64,' + imageData;
    },(err)=>{});
  }
  choosePhoto(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
    this.imageName = imageData;
    this.show=true;
    this.imgUrl = 'data:image/jpeg;base64,' + imageData;
    },(err)=>{});
  }
  transferData(){
    let formData = new FormData();
    if (this.number && this.imageName){
      formData.append('image', this.imageName); 
      formData.append('number',this.number);
      this.http.post("http://192.168.1.3:8000/api-imageUpload", formData, {withCredentials: true}).subscribe((res:any) => { 
      this.reading = res.reading; 
      this.imgResult = "http://192.168.1.3:8000/media/"+res.path+"_processed";
      this.show_res=true;
      this.show_reading=true;     
      var message = "The image was successfully uploaded!";
      this.showAlert(message);   
      }, (err) => {
        var message = "Error in uploading file " + err.errors;
        this.showAlert(message);
      });
    }
    else {
      this.showAlert("kindly enter the number of the meter and take a picture");
    } 
  }
  logout(){
    this.accountsProvider.logout().subscribe(res=>{
      this.navCtrl.push(StartupPage);    
    },
      err => {
        this.showAlert("you are not logged in");
      }
    );}
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: message,
      buttons: ['OK']

    });   
    alert.present();
  }
}

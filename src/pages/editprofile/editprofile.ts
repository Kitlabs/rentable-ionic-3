import { Component,Renderer, ElementRef } from '@angular/core';
import { NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { KeyboardDirective } from '../../directives/keyboard/keyboard';
import { File } from '@ionic-native/file';
import { ProfileProvider } from '../../providers/payment/profile';
import { storage } from 'firebase';
import firebase from 'firebase';
import { Profile } from '../profile/profile';
import { Storage } from '@ionic/storage';

/*
  Generated class for the EditprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {

	private editprofile:any;
  private profile=Profile;
  private firstname:any;
  private lastname:any;
  private email:any;
  private phonenumber:any;
  private password:any;
  private postalcode:any;
  private type:any;
  private showpassword:any;
  private Profiledata:any;
  private imageURI:any;
  private imageFileName:any;
  private captureurl:any;
  private uuid:any;
  private profilePic:Array<any>
  private base64Image: string;
  private loading:any;
  private basePath:string;
  private countryCode:string;
  private numberWithoutCode;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileprovider: ProfileProvider,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public device: Device,
    public storage:Storage
  ) {
	  this.editprofile ={
    img: 'assets/img/profile-img.png', name: 'John Doe', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }

    //this.imageURI="assets/img/profile-img.png";
    this.imageURI="54.79.124.187/api/uploads/dummy.png";
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePagePage');
    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter EditprofilePagePage');    

    this.profilePic=[];   

    this.storage.get('userId').then((userId)=>{
      if(userId!=null){

          this.Profiledata=this.profileprovider.Getprofile(userId).subscribe(data =>{
          console.log(data.json().userDetails);
          this.firstname=data.json().userDetails[0].firstName;
          this.lastname=data.json().userDetails[0].lastName;
          this.email=data.json().userDetails[0].email;
          this.phonenumber=data.json().userDetails[0].phoneNumber;  
          this.postalcode=data.json().userDetails[0].postalCode;
          this.password=data.json().userDetails[0].password;
          this.imageURI=data.json().base_path+data.json().userDetails[0].photoURL;
          this.basePath=data.json().base_path;
          },
          err =>{
            console.log(err);
          });

      }else{          
     }
    });

  }

  firstfocus(){
    this.navCtrl.push('ProfileinputPage',{
      type: "FIRST NAME",
      data:this.firstname,
      option:"other"
    })
  }

  lastfocus(){
    this.navCtrl.push('ProfileinputPage',{
      type: "LAST NAME",
      data:this.lastname,
      option:"other"
    })
  }

  mobilefocus(){
    //console.log(this.phonenumber.split("0")[0]);
    
    let res = this.phonenumber.split("0");

    let no = this.phonenumber.slice(res[0].length, this.phonenumber.length);



    console.log("CODE=",res[0]);
    console.log("NO=",no);

    this.navCtrl.push('ProfileinputPage',{
      type: "MOBILE NUMBER",
      data:no,
      code:res[0],
      option:"mobile"
    })
    //this.showDevelopment("Under Development");
  
  }


  emailfocus(){
    this.navCtrl.push('ProfileinputPage',{
      type: "EMAIL",
      data:this.email,
      option:"email"
    })
    //this.showDevelopment("Under Development");

  }

  passwordfocus(){
    //  this.navCtrl.push(ProfileinputPage,{
    //   type: "PASSWORD"
    // })
    //this.showDevelopment("Under Development");
    
    this.navCtrl.push('ChangePasswordPage');
  }

  
  postalfocus(){
    this.navCtrl.push('ProfileinputPage',{
      type: "POSTAL CODE",
      data:this.postalcode,
      option:"postal"
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  getImage() {

    
     console.log("take photo");
     const options: CameraOptions = {
      quality: 50,
      targetHeight:800,
      targetWidth:800,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.profilePic.push(imageData);
      this.uploadProfileImage();
        
    });

    // this.profileprovider.ChangeProfile(this.email, this.phonenumber, this.password, this.firstname, this.lastname, filename, this.postalcode).subscribe(
    //   data=>{
    //     alert("success update");
    //     this.navCtrl.popTo(EditprofilePage);
    //   },err =>{
    //     alert("error");
    //   });
  }

  uploadProfileImage(){
    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      }); 

    this.storage.get('userId').then((userId)=>{
      if(userId!=null){


        this.loading.present();
        this.Profiledata=this.profileprovider.uploadProfilePic(userId,this.profilePic).subscribe(
          data =>{
              this.loading.dismiss();
              console.log(data.json());
              if(data.json().msg=="success"){
                this.showToast(data.json().msg_details,"true");
              }

              if(data.json().msg=="error"){
                this.showToast(data.json().msg_details,"false");
              }
        },
        err =>{
          this.loading.dismiss();
          console.log(err);
        });         
     }else{
       console.log("device id not saved");
     }
    });
  }
 
 /*
  Function to display toast 
  msg:contain message title
 */
 showToast(msg:string,goBack:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      position:"top",
      duration:2000
    });

     toast.onDidDismiss(()=>{
       if(goBack=="true"){
          this.navCtrl.popTo(EditprofilePage);
       }
     });
    toast.present();
  }

showDevelopment(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      position:"top",
      duration:2000
    });
    toast.present();
  }



}

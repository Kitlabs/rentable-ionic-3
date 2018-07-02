import { Component , Directive ,ViewChild } from '@angular/core';
import { Nav, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';

import { AddpaymentPage } from '../addpayment/addpayment';
import { EditprofilePage } from '../editprofile/editprofile';
import { Home } from '../home/home';
import { About } from '../about/about';
import { FeedbackPage } from '../feedback/feedback';
import { LandingPage } from '../landing/landing';
import { MyStats } from '../myitem/myitem';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
import { TabPage } from '../tab/tab'
import { TcPage } from '../tc/tc';
import { ContactPage } from '../contact/contact';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {
  
  //addpayment=AddpaymentPage;
  addpayment='PaymentSettingPage';
  editprofile=EditprofilePage;
  contactPage=ContactPage;
  profile:any;
  home=Home;
  about=About;
  feedback=FeedbackPage;
  logout=LandingPage;
  mystats=MyStats;
  loading:any;
  userId:any;
  userInfo:any; 
  name:any;
  profileDetail:any;
  basePath:string;
  profilePic:string;
  tc:any;
  helpSupportPage:any;
  constructor(
   public navCtrl: NavController,
   public navParams: NavParams, 
   public afAuth: AngularFireAuth,
   public authprovier: AuthenticateProvider,
   public loadingCtrl:LoadingController,
   public storage:Storage
  ) {
    console.log("it is constructor");
    this.profile ={
      img: 'assets/img/profile-img.png', name: 'John Doe', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }

    this.tc=TcPage;
    this.helpSupportPage='HelpSupportPage';
  }

  ionViewDidLoad(){

      this.getUserDetails();
  }

  goToWalkThrough(){
    this.navCtrl.push('WalkthroughPage',{
      type:'profile'
    });
  }

  //method to get user details
  getUserDetails(){

     // this.loading=this.loadingCtrl.create({
     //    spinner:'bubbles',
     //    content:`Please wait..`
     //  });

     //  this.loading.present();
      
      console.log("get user details");
      this.storage.get('userId').then((data)=>{
      this.userId=data;

      this.authprovier.getUserDetail(this.userId).subscribe(
        data=>{
          console.log(data.json());
          this.userInfo=data.json().userDetails;
          this.name=this.userInfo[0].firstName+" "+this.userInfo[0].lastName;
          this.profilePic=data.json().base_path+this.userInfo[0].photoURL;

          console.log(this.profilePic);
        },
        err=>{
          // this.loading.dismiss();
            console.log();
        },
        ()=>{
          // this.loading.dismiss();
        }
        );
      });//end of storage
  }

  focusInput(input){
    input.disabled=!input.disabled;
    if(!input.disabled){
      input.setFocus();
      Keyboard.show(); // Android Mobiles
    }
  }

  gohome(){
    this.navCtrl.setRoot(Home);
  }

  gologout(){
    
    //this.afAuth.auth.signOut();
    //TabPage.exit();
    this.storage.set("userId",null);
    this.navCtrl.setRoot(LandingPage);

  }

}

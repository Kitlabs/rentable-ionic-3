import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, AbstractControl  } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-update-mobile-number',
  templateUrl: 'update-mobile-number.html',
})
export class UpdateMobileNumberPage {
  
  digitcode:AbstractControl;
  Usersignup:any;
  formgroup: FormGroup;
  phonenumber:any;
  tabBarElement:any;
  loading:any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl:ViewController,
     public formBuilder: FormBuilder) {

      this.formgroup = formBuilder.group({
        digitcode: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(4) ])]
    });
    
    this.Usersignup=[];
    this.digitcode=this.formgroup.controls['digitcode'];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateMobileNumberPage');
  }


  numberfill(){
    var n=this.digitcode.value.length;
    if (n>4) {
      //document.getElementById("code").style.backgroundColor = "red";
      document.getElementById("code").style.color = "red";
     
    }else{
      document.getElementById("code").style.color="white";
    }

  }

  closeModel(){
      this.viewCtrl.dismiss(this.digitcode.value);
  }

  close(){
    this.viewCtrl.dismiss();
}
  



}

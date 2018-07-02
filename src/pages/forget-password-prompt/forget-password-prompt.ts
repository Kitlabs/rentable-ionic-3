import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-forget-password-prompt',
  templateUrl: 'forget-password-prompt.html',
})
export class ForgetPasswordPromptPage {
	
	forgetForm:FormGroup;
	email:any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl:ViewController,
    public toastCtrl:ToastController,
  	public authProvider:AuthenticateProvider,
  	public formBuilder:FormBuilder) {

  	//let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let EMAIL_REGEXP=/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    this.forgetForm=formBuilder.group({
  		email:['',Validators.compose([Validators.required,Validators.pattern(EMAIL_REGEXP),Validators.maxLength(50)])]
  	});
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPromptPage');
    this.email=this.forgetForm.controls['email'];
  }

  doForget(){

  	this.email=this.email.value;
  	this.viewCtrl.dismiss();

  	this.authProvider.sendForgetCode(this.email).subscribe(
  		
  		data=>{
  				if(data.json().msg=="success"){
            this.showToast("A reset code has been sent to your phone",1);
          }

          if(data.json().msg=="error"){
            this.showToast(data.json().msg_details,2);
          }
  		},
  		
  		err=>{
          this.showToast("Please try again later",2)
  		},

  		()=>{

  		}
  		);
  }

  closeModal(){
  	this.viewCtrl.dismiss();
  }

  showToast(msg:string,id:any) {
     let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });

     toast.onDidDismiss(()=>{
       if(id==1){
        this.navCtrl.push("ForgetpassswordPage",{
         email:this.email
       })
        
       }
     })

    toast.present(toast);
  }

}

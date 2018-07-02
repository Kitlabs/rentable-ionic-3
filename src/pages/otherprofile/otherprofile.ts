import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { Details } from '../details/details';
import { ProfileProvider } from '../../providers/payment/profile';
import { ItemsProvider } from '../../providers/items/items';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
/*
  Generated class for the OtherprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-otherprofile',
  templateUrl: 'otherprofile.html'
})
export class OtherprofilePage {


  rent=RentPage;
  productdetail=Details;
	otherprofile:any;
  avaiablelist: Array<any>;
  postlist: Array<any>;
  isavailable:any;
  like:any;
  userId:any;
  userInfo:any;
  name:any;
  own_avaiablelist:any;

  userRatingPos:any;
  userRatingNeg:any;
  basePath:any;
  profilePic:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public authprovier: AuthenticateProvider,
    public itemprovider: ItemsProvider,
    public profileProvider:ProfileProvider) {

    this.like = [];
    for (var i = 0; i < 12; ++i) {
      this.like[i]=false;
    }
    this.userRatingNeg=[];
    this.userRatingPos=[];


  	this.otherprofile = {
      img: 'assets/img/profile-img.png', name: 'John Doe', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }

    this.avaiablelist =
    [
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'0'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'1'},
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'2'},
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'3'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'4'},
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'5'},
    ]

    this.postlist =
    [
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'0'},
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'1'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'2'},
      {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20',id:'3'},
      {img: 'assets/img/22.png', title: 'John', view:'10', favourity:'20',id:'4'},
      {img: 'assets/img/33.png', title: 'John', view:'10', favourity:'20',id:'5'},
    ]

    this.userId=this.navParams.get("userId");
    this.basePath="http://54.79.124.187/api/uploads/"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherprofilePagePage');
    this.isavailable="available";
    this.getUserDetails();
    this.setUserRating();
    this.getItemWithStatus("available");
  }

  ActiveLike(i){
    this.like[i] = !this.like[i];
  }


  //method to get user details
  getUserDetails(){

      this.authprovier.getUserDetail(this.userId).subscribe(
        data=>{

          console.log(data);
          this.userInfo=data.json().userDetails;
          this.name=this.userInfo[0].firstName+" "+this.userInfo[0].lastName;
          this.profilePic=this.basePath+this.userInfo[0].photoURL;
         

        }

        );





  }
/*
  function to get list of item  via status 
  status can be available,rented,pending,returned
  */
  getItemWithStatus(status:any){

    this.itemprovider.getIOwnAvailableItemsSecond(this.userId,"IownAvailable").subscribe(
        data=>{
          
          console.log("I OWN AVAILABEL");
          console.log(data.json());
           if(data.json().msg=="success"){
             this.own_avaiablelist=data.json().data;
           }    
        }
       );

  }


  goToProductDetail(itemId){
     this.navCtrl.push(Details,{
       itemId:itemId
     })

    //this.navCtrl.pop();
  }

  goPreviousPage(){
    /*this.navCtrl.push(Details,{
      itemId:this.itemId
    })*/
    this.navCtrl.pop();
  }



  /*
    Function to set user rating
  */
 setUserRating(){

  let rating:any ;
  //product rating
   this.profileProvider.getRating(this.userId).subscribe(
     (data)=>{
       rating=data.json().AverageRating;
       console.log(rating);
     if(data.json().msg=="success"){

       if(rating>0 && rating<1)
       {
         rating=0
       }
       if(rating>=1 && rating<2)
       {
         rating=1;
       }
       if(rating>=2 && rating<3)
       {
         rating=2;
       }
       if(rating>=3 && rating<4)
       {
         rating=3;
       }
       if(rating>=4 && rating<5)
       {
         rating=4;
       }
       if(rating>=5)
       {
         rating=5;
       }
       for (var i=0; i < rating;  i++) {
                this.userRatingPos[i]=i;
            }  
  
        for (var j=0; j < 5-rating;  j++) {
          this.userRatingNeg[j]=j;
        } 
     }
     },
   err=>{

   }
   );

}


}

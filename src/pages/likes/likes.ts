import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';

import { Details } from '../details/details';
import { MapPage } from '../map/map';
import { Home } from '../home/home';
import { MapModal } from '../modal-page/modal-page';
import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Myrent } from '../myrent/myrent';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html'
})

export class Likes {

  @ViewChild(Navbar) navBar: Navbar;

  categorylist:Array<any> = [];
  newcategorylist:Array<any>;
  profile=Profile;
  search=SearchPage;
  details=Details;
  myrent=Myrent;
  realitems:any;
  like:any;
  userId:string;
  basePath:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public itemprovider: ItemsProvider,
    public storage:Storage,) {

    console.log(this.categorylist.length);
    // for (var i = 0; i < 12; ++i) {
    //         this.like[i]=false;
    //       }
    /*this.categorylist = [
      {img: 'assets/img/01.png', price:'21',id:'0'},
      {img: 'assets/img/02.png', price:'56',id:'1'},
      {img: 'assets/img/03.png', price:'34',id:'2'},
      {img: 'assets/img/04.png', price:'21',id:'3'},
      {img: 'assets/img/01.png', price:'15',id:'4'},
      {img: 'assets/img/02.png', price:'65',id:'5'},
      {img: 'assets/img/03.png', price:'64',id:'6'},
      {img: 'assets/img/04.png', price:'123',id:'7'},
      {img: 'assets/img/01.png', price:'21',id:'8'},
      {img: 'assets/img/02.png', price:'12',id:'9'},
      {img: 'assets/img/03.png', price:'52',id:'10'},
      {img: 'assets/img/04.png', price:'212',id:'11'}
    ]*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikesPage');
    //alert('likes')
    // this.navBar.backButtonClick = () => {

    //   this.navCtrl.setRoot(Myrent);
    // }
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter LikesPage");
    this.like = [];
    this.getListOfFavouriteList();
  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter LikesPage");
  }



  ActiveLike(i){ 
    this.like[i] = false;
  }

  UnactiveLike(i){
    this.like[i]=true;
  }

  ActiveFavourite(itemId){
    
    this.categorylist.splice(itemId,1);
    this.like[itemId] = false;
    this.itemprovider.addRemoveFavourite(this.userId,itemId,1).subscribe(data=>{
      console.log(data);
      this.categorylist.splice(itemId,1);
    });
  }

  DeactiveFavourite(i,itemId){
    console.log("deactivate="+itemId);
    
    this.like[i]=true;
    this.itemprovider.addRemoveFavourite(this.userId,itemId,0).subscribe(data=>{
     console.log(data); 
     this.categorylist.splice(i,1);
     console.log(this.categorylist);
    });
  }

  goToDetails(itemId){
    console.log(itemId);
    this.navCtrl.push(Details,{
      itemId:itemId
    });

  }

  getListOfFavouriteList(){

    this.storage.get('userId').then((data)=>{
    this.userId=data;
    this.itemprovider.getFavouriteList(this.userId).subscribe(data =>{
        if(data.json().msg=="success"){
          console.log(data.json());
          this.basePath=data.json().base_path;
          this.categorylist=data.json().msg_details;        
        }

        if(data.json().msg=="error"){

        }

    },
     err=>{
      console.log("error");
    });

  });

  }

}

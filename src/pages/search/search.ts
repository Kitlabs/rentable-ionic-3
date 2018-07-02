import { Component,ViewChild, ElementRef,OnInit } from '@angular/core';
import { NavController, NavParams, ModalController,Events } from 'ionic-angular';
/*import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Calendar } from '@ionic-native/calendar';*/
import { FormGroup, FormControl } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';
import { Geolocation} from 'ionic-native';
import { Storage } from '@ionic/storage';
import { MapPage } from '../map/map';
import { Home } from '../home/home';
import { MapModal } from '../modal-page/modal-page';
import { SearchresultPage } from '../searchresult/searchresult';
//import {googlemaps} from 'googlemaps';
import { Jsonp } from '@angular/http';
declare var google;  

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit {

  
  @ViewChild('map') mapElement: ElementRef;
  //map:any;

  categorylist:Array<any>;
	map=MapModal;
  searchresult=SearchresultPage;
  home=Home;
	datePeriod:any;
  sortBy:any;
  within:any;
  distance:any=0;
  fromprice:any;
  toprice:any;
  category:any;
  location:any;
  date:any;
  filteredOptionList:any;
  lat:any;
  lng:any;
  categoryImg:any;
  loc:any;
  priceSliderStatus:boolean=false;

  //google place picker variable
  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;
  //test
  orderBy:any;

  //Hold the status of search button
  searchStatus:boolean=false;
  anyFilteredSelectedStatus:boolean=false;
  //Price range selector
  time: any;
  timeMin: any = 5;
  timeMax: any = 500;
  timeMin2: any;
  timeMax2: any;
  ages:any;
  resetStatus:boolean=false;
  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public navParams: NavParams, 
    public itemprovider: ItemsProvider,
    public ev:Events,
    public storage:Storage) {
  	this.categorylist = [
      // {active_img: 'assets/icon/cat-nearyou-red.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby',radionumber:'radio1'},
      {active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value:'electronics',radionumber:'radio2'},
      {active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value:'cars',radionumber:'radio3'},
      {active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value:'sports',radionumber:'radio4'},
      {active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value:'home',radionumber:'radio5'},
      {active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value:'movies',radionumber:'radio6'},
      {active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value:'fashion',radionumber:'radio7'},
      {active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value:'baby',radionumber:'radio8'},
      {active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value:'tools',radionumber:'radio9'},
      {active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value:'party',radionumber:'radio10'},
      {active_img: 'assets/icon/cat-other-red.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', value:'other',radionumber:'postradio11'}
    ]
    this.location="Change Location";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPagePage');
    this.time={
      lower:5,
      upper:500,
    }
    this.timeMin2 = this.timeMin;
    this.timeMax2 = this.timeMax;
    //this.initAutocomplete();
  }

  /*
    Not used
  */
  ngOnInit() {

  // this.acService = new google.maps.places.AutocompleteService();        
  // this.autocompleteItems = [];
  // this.autocomplete = {
  // query: ''
  // };        
 
}



setBadge(time) {
    this.timeMin2 = time.lower;
    this.timeMax2 = time.upper;
    this.fromprice=time.lower;
    this.toprice=time.upper;
    if(this.fromprice==5 && this.toprice==500)
    {   
      this.checkAnyFilterOptionSelectedOrNot("set badge");
    }else{
      console.log("ELSEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      this.enableShowButton();
    }
}

onAgeChange(ev){
  console.log(ev);
}

selected(value: string) {
  this.orderBy = value;
}

ionViewWillEnter(){
  console.log("ionViewWillEnter");
  this.storage.get('selectedFilterOption').then((filteredOption) => {
    console.log("SELECTED FILTERED OPTION=",filteredOption);
    if(JSON.parse(filteredOption)){
      this.setFilteredOption(JSON.parse(filteredOption));
    }
  });

  }

  /*
  Not used
  */
  updateSearch() {
    console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }

    let self = this; 
    let config = { 
    types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
    input: this.autocomplete.query, 
    componentRestrictions: {  } 
    }

    this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];            
      predictions.forEach(function (prediction) {              
      self.autocompleteItems.push(prediction);
      });
    });
  }

  chooseItem(selectedPlace:any){
      console.log(selectedPlace);
  }

  presentModal() {

  //   let modal = this.modalCtrl.create('ModalPlaceautocompletePage');
  //   modal.onDidDismiss(data => {

  //     if(data){
  //       console.log(data);
  //       this.location = data.description;
  //       // get details
  //       this.getPlaceDetail(data.description);
  //     }                
  // })
  //   modal.present();

  let modal = this.modalCtrl.create(this.map);
  modal.onDidDismiss(data=>{
      if(data){
        console.log("D I S M I S S = ",data);
        this.location=data.address;
        this.lat=data.lat;
        this.lng=data.lng;
        this.loc=data.address;
        this.enableShowButton();
      }  
    
  });
  
  modal.present();


  } 

  gohome(){
      this.navCtrl.setRoot(Home);
  }
  
  demo(){
    console.log("Demo");
  }

  getPlaceDetail(address:string):void {
    
    var self = this;

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //callback(results[0].geometry.location);
            console.log(results[0].geometry.location);
            self.lat=results[0].geometry.location.lat();
            self.lng=results[0].geometry.location.lng();
            var s = address;
            var fields = s.split(/,/);
            var loc1 = fields[0];
            self.loc=loc1;
    
            console.log(this.lat+","+this.lng);
          } 
    });

    // this.demo();
    // var request = {
    //     placeId: place_id
    // };

    // this.placesService = new google.maps.places.PlacesService(this.map);
    // this.placesService.getDetails(request, callback);
    // function callback(place, status) {
    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //         console.log('page > getPlaceDetail > place > ', place);
    //         // set full address
    //         self.location = place.formatted_address;
    //         self.lat = place.geometry.location.lat();
    //         self.lng = place.geometry.location.lng();
            
    //       }else{
    //         console.log('page > getPlaceDetail > status > ', status);
    //     }
    // }
}


  /**
   * Method to update the search filter if user already saved filtering options
   */
  setFilteredOption(option){
    console.log(option);
    //1.location
    if(option.location){
      this.location=option.location;
      this.lat=option.lat;
      this.lng=option.lng;
      this.loc=option.location;
      this.enableShowButton();
   }else{
       this.location="Change Location";
   }

   //2.category
  this.storage.get("categorySelectedFilter").then((res)=>{
   
    if(res){  
      if(res.catStatus=="true"){
          //catName:this.category,catImage:this.categoryImg,
          //let selected={"catStatus":"true","catTitle":this.categorylist[i].title,"catValue":this.categorylist[i].value,"catId":i}
          this.category=res.catTitle;
          this.categoryImg=res.catImg;
          document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].active_img);
          document.getElementById(res.catTitle).style.color="#f55349";
          this.enableShowButton();
        }
      }                       
  });




  //3.distance
   if(option.distance!=0){
     this.lat=option.lat;
     this.lng=option.lng;
     this.distance=option.distance;
     this.enableShowButton();
   }
   
   //4.price
   if(option.fromPrice || option.toPrice){
     this.toprice=option.toPrice;
     this.fromprice=option.fromPrice;
     this.timeMin2 = this.fromprice;
     this.timeMax2 = this.toprice;
     this.time={
      lower:this.timeMin2,
      upper:this.timeMax2
    }

   }
   
   //5.posted within
   if(option.postedWithin){
     this.within=option.postedWithin;
   }

   //6.sortby 
   //if sortby contain first then we need to include location
   if(option.sortedBy){
      this.sortBy=option.sortedBy;
     if(option.sortedBy=="Closest first"){
      this.lat=option.lat;
      this.lng=option.lng;
     }
   }

  }

  /** 
   * Method to reset the already selected filter option to default
  */
  reset(){
    
    this.resetStatus=true;
    this.category="";
    this.distance=0;
    this.fromprice="";
    this.toprice="";
    this.location="Change Location";
    this.within="";
    this.sortBy="";
    this.lat="";
    this.lng="";
    this.loc=""
    this.time={
      lower:5,
      upper:500,
    }
    this.disableShowButton();
    this.storage.set("search_location",null);

    this.storage.set('selectedFilterOption',null);
    this.storage.get("categorySelectedFilter").then((res)=>{
      if(res){  
        if(res.catStatus=="true"){
            document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].inactive_img);//image item.value
            document.getElementById(res.catTitle).style.color="#000";//item.title
            this.storage.set("categorySelectedFilter",null);
          }
        }                       
      });
    
  }


  /*
    Method used to select or deselect the category
  */
  myFunction(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var parent = event.srcElement.parentElement;
    var preparent = parent.parentElement;
    var divparent = preparent.parentElement;
    var children = divparent.children;
    var count = children.length;
    for (var i = 0; i < count; ++i) {
      if(preparent==children[i]){
        var image=this.categorylist[i].active_img;
        this.category=this.categorylist[i].title;
        this.categoryImg=this.categorylist[i].inactive_img;

        let selected={"catStatus":"true","catTitle":this.categorylist[i].title,"catValue":this.categorylist[i].value,"catId":i,"catImg":this.categoryImg}
        this.storage.set("categorySelectedFilter",selected);

        console.log(children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0] + "children[i]");
        children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", image);
        children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: #f55349;");
        this.enableShowButton();
      }
      else{
        var inactiveimage=this.categorylist[i].inactive_img;
        children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
        children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: #000;");
      }
    }
  }

  changlocation(){
    // var searchBox = new google.maps.places.SearchBox(this.location);
    // this.map.addListener('bounds_changed', function() {
    //       searchBox.setBounds(this.map.getBounds());
    //     });
    // console.log(this.location);
    // searchBox.addListener('places_changed', function() {
    //   var places = searchBox.getPlaces();
    //     if (places.length == 0) {
    //       return;
    //     }
    // });
  }


  /** 
   * Called when distance change
   * Need to send location details with distance
  */
  distanceChange(){
    console.log(this.distance);
    if(this.distance!=0){
        this.enableShowButton();
    }else{
      
      this.checkAnyFilterOptionSelectedOrNot("distance change");
    }
  }

  /** 
   * Called when from price change : not used 17 apr
  */
 fromPriceChange(){
  var a = parseFloat(this.fromprice);
  var b = parseFloat(this.toprice);
  if( this.fromprice && this.toprice){
       if(a>b){
          document.getElementById('from-price').className = 'price-invalid';
       }else{
        document.getElementById('from-price').className = 'price-valid';
        document.getElementById('to-price').className = 'price-valid';
       }
    }else{
      console.log("else part");
    }

  }

  /** 
   * Called when to price change :not used 17apr
  */
  toPriceChange(){
    var a = parseFloat(this.fromprice);
    var b = parseFloat(this.toprice);
    if(this.toprice && this.fromprice){
        if(b<a){
          this.disableShowButton();
          document.getElementById('to-price').className = 'price-invalid';
        }else{
          this.enableShowButton();
          document.getElementById('from-price').className = 'price-valid';
          document.getElementById('to-price').className = 'price-valid';
        }
    }else{
      console.log("else part");
    }
  }

  checkAnyFilterOptionSelectedOrNot(msg:string){
    // this.filteredOptionList=
    // {lat:this.lat,lng:this.lng,location:this.loc,
    // catName:this.category,catImage:this.categoryImg,
    // distance:this.distance,
    // fromPrice:this.fromprice,toPrice:this.toprice,
    // postedWithin:this.within,
    // sortedBy:this.sortBy};
    console.log("TESTING............");
    console.log("LOC=",this.loc);
    console.log("CATEGORY",this.category);
    console.log("DISTANCE=",this.distance);
    console.log("FROM PRICE=",this.fromprice);
    console.log("FROM PRICE=",this.toprice);
    console.log("WITH IN=",this.within);
    console.log("SORT BY=",this.sortBy);
    
    if(this.loc || this.category || this.distance!=0 || this.fromprice>5 || this.toprice<=500  || this.within || this.sortBy){
      if(this.fromprice!=5 && this.toprice!=500){
          console.log("isidididdddddddddddddddddd");
          this.enableShowButton();
      }else{
        this.disableShowButton();
      }
    }else{
      console.log("disableeeee");
      this.disableShowButton();  
    }
  }

  enableShowButton(){
    this.searchStatus=true;
    this.anyFilteredSelectedStatus=true;
  }

  disableShowButton(){
    console.log("disableeeee");
    this.searchStatus=false;
    this.anyFilteredSelectedStatus=false;
  }

  postedWithinChange(){
    if(this.within){
      this.enableShowButton();
    }else{
      this.checkAnyFilterOptionSelectedOrNot("posted within");
    }
  }

  /** 
   * called when sort by change
   * if "closest first" option selected then we need to send location details too
  */
  sortByChange(){
    if(this.sortBy){
      this.enableShowButton();
    }else{
      this.checkAnyFilterOptionSelectedOrNot("sort by change");
    }

  }


  /**
   * 1.Category
   * 2.PostedWithin
   * 3.PriceFrom
   * 4.PriceTo
   * 5.Lat
   * 6.Long
   * 7.Range
   * 8.userId
   * 9.SortBy
   */
  searchsave(){
    
    //if user selected "distance" or "closest first" option but not selected the location 
    //then we need to get the saved user location from storage 
    if(!this.lat){ 

      if(this.sortBy=="Closest First" || this.distance>0){
        console.log("closest first and distance  selected");
        //check whether user selected the location or not
        if(this.location !="Change Location"){
          //if yes
          console.log("location if");
          this.goToFilterResultPage();
        }else{
          //if no
        console.log("inside locaioneeeeeeeeeeeeeeee");
        this.storage.get('location').then((location) => {
          this.lat=location.lat;
          this.lng=location.lng;
          this.goToFilterResultPage();
        });
        }
      }else{
        console.log("closest first or distance options  not selected but location selected");
        this.goToFilterResultPage();
      }
    }else{
        console.log("location selected by user");
        this.goToFilterResultPage();
    }



   
   

    //  this.filteredOptionList=
    //  {
    //    locationData:[{
    //     lat:this.lat,lng:this.lng,location:this.location
    //    }],
    //    categoryData:[{
    //     catName:this.category,catImage:this.categoryImg
    //    }],
    //    distance:this.distance,
    //    priceRange:[{
    //     fromPrice:this.fromprice,toPrice:this.toprice
    //    }],
    //    postedWithin:this.within,
    //    sortedBy:this.sortBy
    //  }


 

  }

  goToFilterResultPage(){
    //8 paramsparams
    this.filteredOptionList=
      {lat:this.lat,lng:this.lng,location:this.loc,
      catName:this.category,catImage:this.categoryImg,
      distance:this.distance,
      fromPrice:this.fromprice,toPrice:this.toprice,
      postedWithin:this.within,
      sortedBy:this.sortBy};
      
    this.storage.set('selectedFilterOption',JSON.stringify(this.filteredOptionList)).then((data)=>{
      console.log("STORAGE="+data);
      this.navCtrl.push(SearchresultPage);
    }); 

  }
}
